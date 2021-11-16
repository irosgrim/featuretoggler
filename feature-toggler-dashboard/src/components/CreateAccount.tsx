import React from "react";
import react, { FormEventHandler } from "react";
import req from "../api/requests";

type CreateAccountForm = {
    organization: string;
    name: string;
    email: string;
    username: string;
    password: string;
}
const CreateAccount = () => {
    const createNewAccount: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData: CreateAccountForm = {
            organization: '',
            name: '',
            email: '',
            username: '',
            password: '',
        };
        for(let [key, value] of formData.entries()) {
            // @ts-ignore
            userData[key] = value;
        };
        const options = {
            body: JSON.stringify(userData), 
            headers: {"Content-Type": "application/json"}
        }
        const r = await req.post('/account/new', options);
        console.log(r);
    }
    return (
        <div className="w-1/3 mx-auto">
            <h1 className="font-bold text-lg">Create a Feature Toggler account</h1>
            <form className="mt-8" onSubmit={(e) => createNewAccount(e)}>
                <label htmlFor="organization" className="block font-bold">Organization or company name</label>
                <input 
                    type="text" 
                    id="organization" 
                    name="organization" 
                    className="border border-gray-400 rounded-md p-2 w-100"
                />
                <label htmlFor="name" className="block font-bold">Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="border border-gray-400 rounded-md p-2 w-100"
                />
                <label htmlFor="email" className="block font-bold">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="border border-gray-400 rounded-md p-2 w-100"
                />
                <label htmlFor="username" className="block font-bold">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    className="border border-gray-400 rounded-md p-2 w-100"
                />
                <label htmlFor="password" className="block font-bold">Password</label>
                <input type="password" id="password" name="password" className="border border-gray-400 rounded-md p-2 w-100"/>
                <label htmlFor="repeat-password" className="block font-bold">Repeat password</label>
                <input type="password" id="repeat-password" className="border border-gray-400 rounded-md p-2 w-100"/>
                <div className="mt-4">
                    <button type="submit" className="border-2 border-gray-400 rounded-md p-3 bg-white hover:bg-blue-100 hover:border-blue-400">Create account</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAccount;