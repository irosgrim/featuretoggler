"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const featuresAndProjects = (0, express_1.default)();
featuresAndProjects.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const db = (_a = req.services) === null || _a === void 0 ? void 0 : _a.db;
    if (req.user) {
        const { email } = req.user;
        if (db) {
            try {
                const allProjects = yield db.getAllProjectsForUser(email);
                if (!allProjects || !allProjects.length) {
                    res.status(404).send("No projects found!");
                    return;
                }
                res.status(200).send(allProjects);
            }
            catch (err) {
                console.log("Error getting project for user with email: ", err);
            }
        }
    }
    else {
        res.status(401).send("Unauthorized!");
    }
}));
featuresAndProjects.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const db = (_b = req.services) === null || _b === void 0 ? void 0 : _b.db;
    const { projectid: projectId } = req.query;
    if (req.user && projectId) {
        const { email } = req.user;
        if (db) {
            try {
                const deleteProjectResponse = yield db.deleteProject(projectId, email);
                if (!deleteProjectResponse) {
                    res.status(404).send("Project not deleted!");
                    return;
                }
                res.status(200).send(deleteProjectResponse);
            }
            catch (err) {
                console.log("DELETE project error:  ", err);
                res.status(400).send('Could not delete');
            }
        }
    }
    else {
        res.status(401).send("Unauthorized!");
    }
}));
featuresAndProjects.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const db = (_c = req.services) === null || _c === void 0 ? void 0 : _c.db;
    const { projectname, active } = req.query;
    const isActive = active === 'true';
    if (req.user) {
        const { email } = req.user;
        if (db) {
            const newProject = yield db.newProject(email, projectname, isActive, true);
            if (newProject === -1) {
                res.status(400).send(JSON.stringify("The project exists!"));
            }
            if (!newProject || !newProject.length) {
                res.status(404).send("No projects found!");
                return;
            }
            res.status(200).send(newProject[0]);
        }
    }
    else {
        res.status(401).send("Unauthorized!");
    }
}));
featuresAndProjects.get("/features", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const db = (_d = req.services) === null || _d === void 0 ? void 0 : _d.db;
    if (req.user) {
        const { email } = req.user;
        if (db) {
            try {
                const allFeatures = yield db.getAllFeaturesForCurrentUser(email);
                if (!allFeatures || !allFeatures.length) {
                    res.status(404).send("No projects found!");
                    return;
                }
                res.status(200).send(allFeatures);
            }
            catch (err) {
                console.log("Error getting project for user with email: ", err);
            }
        }
    }
    else {
        res.status(401).send("Unauthorized!");
    }
}));
featuresAndProjects.post('/features/update/:projectId/:featureName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { projectId, featureName } = req.params;
    const { enabled } = req.query;
    const db = (_e = req.services) === null || _e === void 0 ? void 0 : _e.db;
    if (req.user) {
        try {
            const toggleFeature = yield (db === null || db === void 0 ? void 0 : db.updateFeature(projectId, featureName, enabled));
            if (toggleFeature) {
                res.status(200).send(toggleFeature);
                return;
            }
            res.status(500).send();
        }
        catch (err) {
            console.log('UPDATE ERROR: ', err);
        }
    }
}));
featuresAndProjects.delete('/features/delete/:projectId/:featureName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const { projectId, featureName } = req.params;
    const db = (_f = req.services) === null || _f === void 0 ? void 0 : _f.db;
    if (req.user) {
        const feature = yield (db === null || db === void 0 ? void 0 : db.getFeatureStateById(projectId, featureName));
        const deletedFeature = yield (db === null || db === void 0 ? void 0 : db.deleteFeatureById(projectId, featureName));
        res.status(200).send(feature);
    }
}));
featuresAndProjects.post('/features/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { projectid, name, value, description, enabled } = req.query;
    const db = (_g = req.services) === null || _g === void 0 ? void 0 : _g.db;
    const isEnabled = enabled === 'true';
    if (req.user) {
        const { email } = req.user;
        try {
            const newFeature = yield (db === null || db === void 0 ? void 0 : db.newFeature(email, projectid, name, value, description, isEnabled));
            if (newFeature) {
                res.status(200).send(newFeature);
            }
            res.status(400).send({ error: 'Feature exists' });
        }
        catch (err) {
            console.log('NEW FEATURE ERROR: ', err);
        }
    }
}));
exports.default = featuresAndProjects;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvcm91dGVzL2Rhc2hib2FyZC9mZWF0dXJlc0FuZFByb2plY3RzLnRzIiwic291cmNlcyI6WyJDOi9Vc2Vycy9pb3Jvcy9Eb2N1bWVudHMvcGxheWdyb3VuZC9kb2NrZXItc2VydmljZXMvZmVhdHVyZS10b2dnbGVyL2ZlYXR1cmUtdG9nZ2xlci1iYWNrZW5kL3NyYy9yb3V0ZXMvZGFzaGJvYXJkL2ZlYXR1cmVzQW5kUHJvamVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFFOUIsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUV0QyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFOztJQUM1QyxNQUFNLEVBQUUsR0FBRyxNQUFBLEdBQUcsQ0FBQyxRQUFRLDBDQUFFLEVBQUUsQ0FBQztJQUMvQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDYixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUMzQixJQUFJLEVBQUUsRUFBRTtZQUNQLElBQUk7Z0JBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxFQUFFLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO29CQUN4QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUMzQyxPQUFPO2lCQUNQO2dCQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FB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QUcsRUFBRTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDeEM7S0FDRDtBQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFSCxrQkFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgZGJJbnRlcmZhY2UgZnJvbSAnLi4vLi4vZGInO1xyXG5jb25zdCBmZWF0dXJlc0FuZFByb2plY3RzID0gZXhwcmVzcygpO1xyXG5cclxuZmVhdHVyZXNBbmRQcm9qZWN0cy5nZXQoXCIvXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xyXG4gICAgY29uc3QgZGIgPSByZXEuc2VydmljZXM/LmRiO1xyXG5cdGlmIChyZXEudXNlcikge1xyXG5cdFx0Y29uc3QgeyBlbWFpbCB9ID0gcmVxLnVzZXI7XHJcblx0XHRpZiAoZGIpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjb25zdCBhbGxQcm9qZWN0cyA9IGF3YWl0IGRiLmdldEFsbFByb2plY3RzRm9yVXNlcihlbWFpbCk7XHJcblx0XHRcdFx0aWYgKCFhbGxQcm9qZWN0cyB8fCAhYWxsUHJvamVjdHMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRyZXMuc3RhdHVzKDQwNCkuc2VuZChcIk5vIHByb2plY3RzIGZvdW5kIVwiKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVzLnN0YXR1cygyMDApLnNlbmQoYWxsUHJvamVjdHMpO1xyXG5cdFx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGdldHRpbmcgcHJvamVjdCBmb3IgdXNlciB3aXRoIGVtYWlsOiBcIiwgZXJyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXMuc3RhdHVzKDQwMSkuc2VuZChcIlVuYXV0aG9yaXplZCFcIik7XHJcblx0fVxyXG59KTtcclxuXHJcbmZlYXR1cmVzQW5kUHJvamVjdHMucG9zdChcIi9kZWxldGVcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcbiAgICBjb25zdCBkYiA9IHJlcS5zZXJ2aWNlcz8uZGI7XHJcblx0Y29uc3QgeyBwcm9qZWN0aWQ6IHByb2plY3RJZCB9ID0gcmVxLnF1ZXJ5O1xyXG5cdGlmIChyZXEudXNlciAmJiBwcm9qZWN0SWQpIHtcclxuXHRcdGNvbnN0IHsgZW1haWwgfSA9IHJlcS51c2VyO1xyXG5cdFx0aWYgKGRiKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgZGVsZXRlUHJvamVjdFJlc3BvbnNlID0gYXdhaXQgZGIuZGVsZXRlUHJvamVjdChwcm9qZWN0SWQgYXMgc3RyaW5nLCBlbWFpbCk7XHJcblx0XHRcdFx0aWYgKCFkZWxldGVQcm9qZWN0UmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiUHJvamVjdCBub3QgZGVsZXRlZCFcIik7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlcy5zdGF0dXMoMjAwKS5zZW5kKGRlbGV0ZVByb2plY3RSZXNwb25zZSk7XHJcblx0XHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiREVMRVRFIHByb2plY3QgZXJyb3I6ICBcIiwgZXJyKTtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDQwMCkuc2VuZCgnQ291bGQgbm90IGRlbGV0ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKS5zZW5kKFwiVW5hdXRob3JpemVkIVwiKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuZmVhdHVyZXNBbmRQcm9qZWN0cy5wb3N0KFwiL25ld1wiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IGRiID0gcmVxLnNlcnZpY2VzPy5kYjtcclxuXHRjb25zdCB7IHByb2plY3RuYW1lLCBhY3RpdmUgfSA9IHJlcS5xdWVyeTtcclxuXHRjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZSA9PT0gJ3RydWUnO1xyXG5cdGlmIChyZXEudXNlcikge1xyXG5cdFx0Y29uc3QgeyBlbWFpbCB9ID0gcmVxLnVzZXI7XHJcblx0XHRpZiAoZGIpIHtcclxuXHRcdFx0Y29uc3QgbmV3UHJvamVjdCA9IGF3YWl0IGRiLm5ld1Byb2plY3QoZW1haWwsIHByb2plY3RuYW1lIGFzIHN0cmluZywgaXNBY3RpdmUsIHRydWUpO1xyXG5cdFx0XHRpZihuZXdQcm9qZWN0ID09PSAtMSkge1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDAwKS5zZW5kKEpTT04uc3RyaW5naWZ5KFwiVGhlIHByb2plY3QgZXhpc3RzIVwiKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFuZXdQcm9qZWN0IHx8ICFuZXdQcm9qZWN0Lmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gcHJvamVjdHMgZm91bmQhXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZChuZXdQcm9qZWN0WzBdKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVzLnN0YXR1cyg0MDEpLnNlbmQoXCJVbmF1dGhvcml6ZWQhXCIpO1xyXG5cdH1cclxufSk7XHJcblxyXG5mZWF0dXJlc0FuZFByb2plY3RzLmdldChcIi9mZWF0dXJlc1wiLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuICAgIGNvbnN0IGRiID0gcmVxLnNlcnZpY2VzPy5kYjtcclxuXHRpZiAocmVxLnVzZXIpIHtcclxuXHRcdGNvbnN0IHsgZW1haWwgfSA9IHJlcS51c2VyO1xyXG5cdFx0aWYgKGRiKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y29uc3QgYWxsRmVhdHVyZXMgPSBhd2FpdCBkYi5nZXRBbGxGZWF0dXJlc0ZvckN1cnJlbnRVc2VyKGVtYWlsKTtcclxuXHRcdFx0XHRpZiAoIWFsbEZlYXR1cmVzIHx8ICFhbGxGZWF0dXJlcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdHJlcy5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gcHJvamVjdHMgZm91bmQhXCIpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZChhbGxGZWF0dXJlcyk7XHJcblx0XHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3IgZ2V0dGluZyBwcm9qZWN0IGZvciB1c2VyIHdpdGggZW1haWw6IFwiLCBlcnIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlcy5zdGF0dXMoNDAxKS5zZW5kKFwiVW5hdXRob3JpemVkIVwiKTtcclxuXHR9XHJcbn0pXHJcblxyXG5mZWF0dXJlc0FuZFByb2plY3RzLnBvc3QoJy9mZWF0dXJlcy91cGRhdGUvOnByb2plY3RJZC86ZmVhdHVyZU5hbWUnLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRjb25zdCB7cHJvamVjdElkLCBmZWF0dXJlTmFtZX0gPSByZXEucGFyYW1zO1xyXG5cdGNvbnN0IHsgZW5hYmxlZCB9ID0gcmVxLnF1ZXJ5O1xyXG5cdGNvbnN0IGRiID0gcmVxLnNlcnZpY2VzPy5kYjtcclxuXHRpZiAocmVxLnVzZXIpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHRvZ2dsZUZlYXR1cmUgPSBhd2FpdCBkYj8udXBkYXRlRmVhdHVyZShwcm9qZWN0SWQsIGZlYXR1cmVOYW1lLCBlbmFibGVkKTtcclxuXHRcdFx0aWYodG9nZ2xlRmVhdHVyZSkge1xyXG5cdFx0XHRcdHJlcy5zdGF0dXMoMjAwKS5zZW5kKHRvZ2dsZUZlYXR1cmUpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXMuc3RhdHVzKDUwMCkuc2VuZCgpO1xyXG5cdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdVUERBVEUgRVJST1I6ICcsIGVycik7XHJcblx0XHR9XHJcblx0fVxyXG59KVxyXG5cclxuZmVhdHVyZXNBbmRQcm9qZWN0cy5kZWxldGUoJy9mZWF0dXJlcy9kZWxldGUvOnByb2plY3RJZC86ZmVhdHVyZU5hbWUnLCBhc3luYyAocmVxLCByZXMpID0+IHtcclxuXHRjb25zdCB7cHJvamVjdElkLCBmZWF0dXJlTmFtZX0gPSByZXEucGFyYW1zO1xyXG5cdGNvbnN0IGRiID0gcmVxLnNlcnZpY2VzPy5kYjtcclxuXHRpZiAocmVxLnVzZXIpIHtcclxuXHRcdGNvbnN0IGZlYXR1cmUgPSBhd2FpdCBkYj8uZ2V0RmVhdHVyZVN0YXRlQnlJZChwcm9qZWN0SWQsIGZlYXR1cmVOYW1lIGFzIHN0cmluZyk7XHJcblx0XHRjb25zdCBkZWxldGVkRmVhdHVyZSA9IGF3YWl0IGRiPy5kZWxldGVGZWF0dXJlQnlJZChwcm9qZWN0SWQsIGZlYXR1cmVOYW1lIGFzIHN0cmluZyk7XHJcblx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZChmZWF0dXJlKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuZmVhdHVyZXNBbmRQcm9qZWN0cy5wb3N0KCcvZmVhdHVyZXMvbmV3JywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XHJcblx0Y29uc3Qge3Byb2plY3RpZCwgbmFtZSwgdmFsdWUsIGRlc2NyaXB0aW9uLCBlbmFibGVkIH0gPSByZXEucXVlcnk7XHJcblx0Y29uc3QgZGIgPSByZXEuc2VydmljZXM/LmRiO1xyXG5cdGNvbnN0IGlzRW5hYmxlZCA9IGVuYWJsZWQgPT09ICd0cnVlJztcclxuXHRpZiAocmVxLnVzZXIpIHtcclxuXHRcdGNvbnN0IHsgZW1haWwgfSA9IHJlcS51c2VyO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgbmV3RmVhdHVyZSA9IGF3YWl0IGRiPy5uZXdGZWF0dXJlKGVtYWlsLCBwcm9qZWN0aWQgYXMgc3RyaW5nLCBuYW1lIGFzIHN0cmluZywgdmFsdWUgYXMgc3RyaW5nLCBkZXNjcmlwdGlvbiBhcyBzdHJpbmcsIGlzRW5hYmxlZCk7XHJcblx0XHRcdGlmKG5ld0ZlYXR1cmUpIHtcclxuXHRcdFx0XHRyZXMuc3RhdHVzKDIwMCkuc2VuZChuZXdGZWF0dXJlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXMuc3RhdHVzKDQwMCkuc2VuZCh7ZXJyb3I6ICdGZWF0dXJlIGV4aXN0cyd9KTtcclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRjb25zb2xlLmxvZygnTkVXIEZFQVRVUkUgRVJST1I6ICcsIGVycik7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZlYXR1cmVzQW5kUHJvamVjdHM7Il19