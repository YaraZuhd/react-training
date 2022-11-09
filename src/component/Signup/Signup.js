import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup">
        <h1>Sign Up</h1>
        <form>
            <input type={'text'} placeholder={'First Name'}/>
            <input type={'text'} placeholder={'Last Name'}/>
            <input type={'email'} placeholder={'Email'}/>
            <input type={'password'} placeholder={'Password'}/>
            <input type={'text'} placeholder={'Phone'}/>
            <input type={'text'} placeholder={'Address'}/>
            <input type={'text'} placeholder={'Gender'}/>
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup;
