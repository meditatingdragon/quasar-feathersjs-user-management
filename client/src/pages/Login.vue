<template>
  <q-page class="flex flex-center">
    <div>
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-sm">
        <div class="row justify-start items-start">
          <div class="col-12">
            <q-input
              outlined
              v-model="$v.formData.email.$model"
              label-color="accent"
              label="Email"
              type="email"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="$v.formData.email.$invalid && $v.formData.email.$dirty"
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-envelope" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.formData.email.required">
                  This field is required.
                </div>
                <div v-if="!$v.formData.email.email">
                  Please provide a valid email address
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              v-model="$v.formData.password.$model"
              label-color="accent"
              label="Password"
              type="password"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.formData.password.$invalid && $v.formData.password.$dirty
              "
              error-message=""
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-lock" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.formData.password.required">
                  This field is required.
                </div>
                <div v-if="!$v.formData.password.minLength">
                  Password must be at least 8 characters.
                </div>
              </template>
            </q-input>
          </div>
        </div>

        <div class="row justify-between">
          <router-link to="/forgot-password">Forgot Password?</router-link>
          <q-space />
          <q-btn
            :disable="disableSubmit"
            :loading="submitting"
            label="Login"
            type="submit"
            color="positive"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
import { Notify } from "quasar";

export default {
  data() {
    return {
      valid: false,
      formData: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    formData: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  computed: {
    ...mapState({
      submitting: state => state.auth.showLoading
    }),
    disableSubmit() {
      return this.$v.formData.$invalid;
    }
  },
  methods: {
    onSubmit() {
      //this.$store.dispatch("auth/loginUser", { formData: this.formData });
      this.$store
        .dispatch("auth/authenticate", {
          strategy: "local",
          email: this.formData.email,
          password: this.formData.password
        })
        // Just use the returned error instead of mapping it from the store.
        .catch(err => {
          // Convert the error to a plain object and add a message.
          let type = err.className;
          err = Object.assign({}, err);
          err.message =
            type === "not-authenticated"
              ? "Incorrect email or password."
              : "An error prevented login.";
          this.error = err;
          Notify.create({
            message: "Incorrect username/password combination.",
            color: "negative"
          });
        });
    }
  }
};
</script>
<style lang="scss">
a {
  &:hover {
    font-weight: bold;
  }
  text-decoration: none;
}
</style>
