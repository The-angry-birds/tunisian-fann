<template>
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form action="#">
        <h4>Create a client account</h4>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your email for registration</span>
        <input type="text" v-model="firstName" placeholder="Firstname" />
        <input type="text" v-model="lastName" placeholder="Lastname" />
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <input
          type="password"
          v-model="Confirmpassword"
          placeholder="Confirm Password"
        />
        <button @click.prevent="handleSubmit()">Sign Up</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#">
        <h3>Sign in</h3>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
          <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <span>or use your account</span>
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button @click.prevent="handleClick()">Sign in</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h3>Welcome Back!</h3>
          <p>To keep connected with us please login with your personal info</p>
          <button class="ghost" id="signIn" @click="movingsignIn()">
            Sign In
          </button>
        </div>
        <div class="overlay-panel overlay-right">
          <h3>Hello, Friend!</h3>
          <p>Enter your personal details and start journey with us</p>
          <button class="ghost" id="signUp" @click="movingsignUp()">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      Confirmpassword: "",
    };
  },
  methods: {
    handleSubmit() {
      if (
        this.email === "" ||
        this.firstName === "" ||
        this.lastName === "" ||
        this.password === "" ||
        this.Confirmpassword === ""
      ) {
        swal("Oops!", "Please fill in information!", "error");
      } else if (this.password.length < 8) {
        swal("Oops!", "Passsword needs to be at least 8 characters!", "error");
      } else if (this.password !== this.Confirmpassword) {
        swal("Oops!", "Password does not match!", "error");
      } else {
        axios
          .get(`http://localhost:3000/api/auth/users/${this.email}`)
          .then((data) => {
            if (data.data.email) {
              swal("Oops!", "This e-mail already exists!", "error");
            } else {
              let data = {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
              };
              this.$store.dispatch("signup", data).then(() => {
                swal("Successfully signed up", "Welcome", "success");
                this.$router.push("/");
              });
            }
          });
      }
    },
    handleClick() {
      if (this.email === "" || this.password === "") {
        swal("Oops!", "You need to fill in all the empty fields!", "error");
      } else {
        let data = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch("login", data).then((res) => {
          console.log(res.data.user.banned);
          if (res.data.message === "wrong password") {
            swal("Oops!", "Wrong Password!", "error");
          // } else if (res.data.user.banned !==false ) {
          //   "Oops!", "You are banned!", "error"
            swal("Oops!", "You are banned!", "error");
          } else if (res.data.message === "success") {
            swal("Welcome", "success");
            this.$router.push("/");
          } else {
            swal("Oops!", "Wrong e-mail!", "error");
          }
        });
      }
    },
    movingsignUp: function() {
      const container = document.getElementById("container");
      container.classList.add("right-panel-active");
    },
    movingsignIn: function() {
      const container = document.getElementById("container");
      container.classList.remove("right-panel-active");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100;300;400;500;600;700;800&display=swap");
* {
  box-sizing: border-box;
}
h2 {
  font-weight: bold;
  margin: 0;
}
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
span {
  font-size: 12px;
}
a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}
button {
  border-radius: 20px;
  border: 1px solid #a08018;
  background-color: #a08018;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}
button:hover {
  border: 1px solid #c0c0c0;
  background-color: #c0c0c0;
  color: #ffffff;
}
button:active {
  transform: scale(0.95);
}
button:focus {
  outline: none;
}
button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}
form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}
input {
  background-color: #eee;
  border: none;
  padding: 5px 8px;
  margin: 8px 0;
  width: 100%;
}
.container {
  font-family: "Lexend", serif;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin-top: 120px;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.overlay {
  background: #0a44ff;
  background: -webkit-linear-gradient(to right, #a08018, #c0c0c0);
  background: linear-gradient(to right, #a08018, #c0c0c0);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-left {
  transform: translateX(-20%);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
.social-container {
  margin: 20px 0;
}
.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
