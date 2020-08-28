<template>
  <q-page class="flex flex-center">
    <div>
      <div class="row">
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
            hint="Create a password. 8 character minimum."
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
        <div class="col-12">
          <q-input
            outlined
            type="password"
            label-color="accent"
            v-model="$v.formData.confirmPassword.$model"
            label="Confirm Password"
            lazy-rules
            dense
            hint="Confirm password"
            class="q-ma-sm"
            :error="
              $v.formData.confirmPassword.$invalid &&
                $v.formData.confirmPassword.$dirty
            "
          >
            <template v-slot:prepend>
              <q-icon color="accent" name="fas fa-lock" size="xs" />
            </template>
            <template v-slot:error>
              <div v-if="!$v.formData.confirmPassword.sameAsPassword">
                Passwords must match.
              </div>
            </template>
          </q-input>
        </div>
        <div class="col-12 text-right">
          <q-btn
            @click="resetPassword"
            :disable="resetValid"
            :loading="submitting"
            label="Update Password"
            type="submit"
            color="positive"
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import userService from "../services/user";
import { Notify } from "quasar";

export default {
  data() {
    return {
      valid: false,
      success: false,
      formData: {
        password: "",
        confirmPassword: ""
      }
    };
  },
  validations: {
    formData: {
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs(formData => {
          return formData.password;
        })
      }
    }
  },
  computed: {
    ...mapState({
      submitting: state => state.auth.showLoading
    }),
    resetValid() {
      return this.$v.formData.$invalid;
    }
  },
  methods: {
    async resetPassword() {
      let token = this.$route.query.token;
      let result;
      if (token) {
        result = await userService
          .resetPassword(token, this.formData.password)
          .catch(err => {
            if (err.response) {
              let code = err.response.data.code;
              Notify.create({
                message: "Unable to verify account. Please contact support.",
                color: "negative"
              });
            }
          });
      } else {
        Notify.create({
          message:
            "Unable to reset password. Please check your email for the password reset link and try again.",
          color: "negative",
          icon: "fas fa-cross"
        });
      }
      if (result && result.status === 201) {
        Notify.create({
          message: "Password successfully changed.",
          color: "positive",
          icon: "fas fa-check"
        });
      }
    }
  }
};
</script>
