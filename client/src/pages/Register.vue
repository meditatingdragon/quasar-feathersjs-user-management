<template>
  <q-page class="row justify-center items-center content-center">
    <div class="col-lg-8" v-if="!registrationComplete">
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-sm">
        <div class="row justify-start items-start">
          <p class="q-ma-sm body-1">
            Sign up for an account below. You'll receive an email to verify your
            account.
          </p>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.formData.firstname.$model"
              label="First Name"
              label-color="accent"
              hint="Given Name"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.formData.firstname.$invalid && $v.formData.firstname.$dirty
              "
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-user" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.formData.firstname.required">
                  This field is required.
                </div>
                <div v-if="!$v.formData.firstname.minLength">
                  Must contain at least 2 characters.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.formData.lastname.$model"
              label="Family Name"
              label-color="accent"
              hint="Surname"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.formData.lastname.$invalid && $v.formData.lastname.$dirty
              "
              error-message="Must be at least 2 characters"
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-user" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.formData.lastname.required">
                  This field is required.
                </div>
                <div v-if="!$v.formData.lastname.minLength">
                  Must contain at least 2 characters.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.formData.email.$model"
              label-color="accent"
              label="Email"
              type="email"
              hint="Verifiable Email Address"
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
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.formData.confirmEmail.$model"
              label-color="accent"
              label="Confirm Email"
              type="text"
              lazy-rules
              hint="Confirm email address"
              dense
              class="q-ma-sm"
              :error="
                $v.formData.confirmEmail.$invalid &&
                  $v.formData.confirmEmail.$dirty
              "
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-envelope" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.formData.confirmEmail.sameAsEmail">
                  Emails must match.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
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
          <div class="col-12 col-md-6">
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
        </div>

        <div class="q-pa-sm text-right">
          <q-btn
            :disable="disableSubmit"
            :loading="submitting"
            label="Register"
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
    <div class="col-lg-8 text-center" v-else>
      Registration complete! Please check your email to confirm your
      registration.
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  validations: {
    formData: {
      firstname: {
        required,
        minLength: minLength(2)
      },
      lastname: {
        required,
        minLength: minLength(2)
      },
      email: {
        required,
        email
      },
      confirmEmail: {
        sameAsEmail: sameAs(formData => {
          return formData.email;
        })
      },
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
      submitting: state => state.auth.showLoading,
      registrationComplete: state => state.auth.registrationComplete
    }),
    disableSubmit() {
      return this.$v.formData.$invalid;
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("account/registerUser", { formData: this.formData });
    }
  }
};
</script>
