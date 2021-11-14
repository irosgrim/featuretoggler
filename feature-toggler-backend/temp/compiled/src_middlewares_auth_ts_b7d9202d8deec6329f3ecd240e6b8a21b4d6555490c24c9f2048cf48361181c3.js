"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAuthorization = (req, res, next) => {
    req.user = {
        name: "ion",
        username: "ion",
        email: "ion@gmail.com",
    };
    console.log(`${req.user.name} is authorised`);
    next();
};
exports.default = checkAuthorization;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvbWlkZGxld2FyZXMvYXV0aC50cyIsInNvdXJjZXMiOlsiQzovVXNlcnMvaW9yb3MvRG9jdW1lbnRzL3BsYXlncm91bmQvZG9ja2VyLXNlcnZpY2VzL2ZlYXR1cmUtdG9nZ2xlci9mZWF0dXJlLXRvZ2dsZXItYmFja2VuZC9zcmMvbWlkZGxld2FyZXMvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM5RSxHQUFHLENBQUMsSUFBSSxHQUFHO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxRQUFRLEVBQUUsS0FBSztRQUNmLEtBQUssRUFBRSxlQUFlO0tBQ3RCLENBQUM7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUM7SUFDOUMsSUFBSSxFQUFFLENBQUM7QUFDUixDQUFDLENBQUM7QUFFRixrQkFBZSxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tIFwiZXhwcmVzc1wiO1xuXG5jb25zdCBjaGVja0F1dGhvcml6YXRpb24gPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+IHtcblx0cmVxLnVzZXIgPSB7XG5cdFx0bmFtZTogXCJpb25cIixcblx0XHR1c2VybmFtZTogXCJpb25cIixcblx0XHRlbWFpbDogXCJpb25AZ21haWwuY29tXCIsXG5cdH07XG5cdGNvbnNvbGUubG9nKGAke3JlcS51c2VyLm5hbWV9IGlzIGF1dGhvcmlzZWRgKTtcblx0bmV4dCgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2hlY2tBdXRob3JpemF0aW9uO1xuIl19