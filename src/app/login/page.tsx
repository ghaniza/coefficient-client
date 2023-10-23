"use client"
import styles from "./login.module.scss"
import Button from "@/components/button";

const LoginPage = () => {
    const handleLogin = () => {
        window.open('/login');
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Hello!</h1>
                <span>Login to your account</span>
                <form>
                    <input placeholder={'Service URL'} type={"url"} />
                    <input placeholder={'Username'} type={"email"} />
                    <input placeholder={'Password'} type={"password"} />
                    <Button color={'secondary'} onClick={handleLogin}>Enter</Button>
                    <small><a href={'#'}>Forgot my password</a></small>
                    <small>Need an account? <a href={"#"}>Signup</a></small>
                </form>
            </div>
            <div className={styles.image}></div>
        </div>
    );
}

export default LoginPage;