<template>
<div>
    <div class="form-wrapper">
        <h1>{{loginForm ? 'Zaloguj się' : 'Zarejestruj się' }}</h1>
        <form
            action="http://localhost:3000/register"
            method="post"
            class="form"
            v-on:submit.prevent="login"
            v-if="loginForm"
        >
            <InputGroup
                v-bind:id="`email`"
                v-bind:name="`email`"
                v-bind:model="email"
                v-on:input="email = $event"
            >
                E-mail
            </InputGroup>
            <InputGroup
                v-bind:id="`password`"
                v-bind:name="`password`"
                v-bind:model="password"
                v-on:input="password = $event"
            >
                Hasło
            </InputGroup>
            <Button
                class="btn1"
                buttonName="Zaloguj"
                type="submit"
            />
            <Button
                class="btn2"
                buttonName="Masz już konto? Zaloguj się tutaj"
                v-on:clickButton="switchForms"
            />
        </form>
        <form
            action="http://localhost:3000/register"
            method="post"
            class="form"
            v-on:submit.prevent="register"
            v-if="!loginForm"
        >
            <InputGroup
                v-bind:id="`email`"
                v-bind:name="`email`"
                v-bind:model="email"
                v-on:input="email = $event"
            >
                E-mail
            </InputGroup>
            <InputGroup
                v-bind:id="`name`"
                v-bind:name="`name`"
                v-bind:model="username"
                v-on:input="username = $event"
            >
                Nazwa użytkownika
            </InputGroup>
            <InputGroup
                v-bind:id="`password`"
                v-bind:name="`password`"
                v-bind:model="password"
                v-on:input="password = $event"
            >
                Hasło
            </InputGroup>
            <InputGroup
                v-bind:id="`password2`"
                v-bind:name="`password2`"
            >
                Powtóz hasło
            </InputGroup>
            <Button
                class="btn1"
                buttonName="Zarejestruj'"
                type="submit"
            />
            <Button
                class="btn2"
                buttonName="Nie masz konta? Zarejestruj się tutaj"
                v-on:clickButton="switchForms"
            />
        </form>
    </div>
</div>
</template>

<script>
import gql from 'graphql-tag';
import InputGroup from '../UI/Form/Input/InputGroup.vue';
import Button from '../UI/Button/Button.vue';

export default {
  name: 'Register',
  components: {
    InputGroup,
    Button,
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',
      url: 'http://localhost:3000/graphql',
      loginForm: true,
    };
  },
  methods: {
    getCookie(cname) {
      const name = `${cname} =`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
    switchForms() {
      console.log(this.loginForm);
      this.loginForm = !this.loginForm;
    },
    login() {
      this.$apollo.mutate({
        mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login (email: $email, password: $password) {
              token,
              userId
          }
        }`,
        variables: {
          email: this.email,
          password: this.password,
        },
      }).then((result) => {
        const { token } = result.data.login;
        const { userId } = result.data.login;
        this.saveUserData(token, userId);
        this.$store.state.isAuthenticated = true;
        this.$router.push({ path: '/' })
      });
    },
    saveUserData(token, userId) {
      document.cookie = `token=${token}`;
      document.cookie = `userId=${userId}`;
    },
  },
};
</script>

<style lang="scss" scoped>

    .form-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        h1 {
            text-align: center;
        }
    }

    .form {
        display: grid;
        width: calc(100% - 40px);
        padding: 20px;
        border: 1px solid green;
        box-shadow: 1px 1px 49px 15px rgba(23, 34, 22, .06);
        grid-row-gap: 20px;
        grid-template-areas:
            'email'
            'username'
            'password1'
            'password2'
            'btn1'
            'btn2'
        ;

        @media only screen and (min-width: 768px) {
            grid-column-gap: 20px;
            grid-template-areas:
                'email username'
                'password1 password1'
                'password2 password2'
                'btn1 btn1'
                'btn2 btn2'
            ;
            padding: 40px;
            width: 600px;
        }

        .form-input-group {
            margin: 0;

            &:first-of-type {
                grid-area: email;
            }

            &:nth-of-type(2) {
                grid-area: username;
            }

            &:nth-of-type(3) {
                grid-area: password1;
            }

            &:nth-of-type(4) {
                grid-area: password2;
            }
        }

        .btn1 {
            grid-area: btn1;
        }

        .btn2 {
            grid-area: btn2;
        }
    }
</style>
