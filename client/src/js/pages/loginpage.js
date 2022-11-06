import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate ();
  
    const onSuccess = (res) => {
        navigate('/');

    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    const onLogin = useGoogleLogin({
        onSuccess: onSuccess,
        onFailure: onFailure
    });

    return (
        <div
            className="m-auto bg-white lg:w-[800px] w-11/12 h-[46rem] max-h-full relative rounded-xl py-12 grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2"
        >
            <div
                className="h-full border-r-2 px-12"
            >
                <div
                    className="font-title text-2xl text-black font-bold mb-4"
                >
                    Login
                </div>
                <div
                    className="flex justify-center pb-3"
                >
                    <button
                        className="text-black w-full border-2 rounded-lg"
                        onClick={onLogin}
                    >
                        Sign in with Google
                    </button>
                    {/* <GoogleLogin
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={false}
                        scope="https://www.googleapis.com/auth/cloud-platform.read-only"
                        useOneTap
                    /> */}
                </div>
                <div
                    className="flex justify-center align-middle h-10"
                >
                    <span className="flex-1 border-b-2 border-gray-500 mx-2 h-1/2" />
                    <span
                        className="font-title text-black mb-1 font-bold h-5 self-center"
                    >
                        or
                    </span>
                    <span className="flex-1 border-b-2 border-gray-500 mx-2 h-1/2" />
                </div>
                <div>
                    <div
                        className="mb-4"
                    >
                        <div
                            className="font-title text-black mb-1"
                        >
                            Email
                        </div>
                        <input 
                            type="text"
                            className="text-black outline-1 w-full appearance-none outline-none outline-slate-400 rounded-md overflow-hidden whitespace-nowrap select-text p-1 bg-white"
                            placeholder=""
                        />
                    </div>
                    <div
                        className="mb-4"
                    >
                        <div
                            className="font-title text-black mb-1"
                        >
                            Password
                        </div>
                        <input 
                            type="text"
                            className="text-black outline-1 w-full appearance-none outline-none outline-slate-400 rounded-md overflow-hidden whitespace-nowrap select-text p-1 bg-white"
                            placeholder=""
                        />
                    </div>
                </div>
            </div>
            <div
                className="mx-8 lg:border-t-0 border-t-2"
            >
                <div
                    className="font-title text-2xl text-black font-bold mx-4 lg:my-0 my-4"
                >
                    This is a test
                </div>
            </div>
        </div>
    );
    
}

export default LoginPage;