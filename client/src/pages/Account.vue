<template>
  <q-page class="row justify-center items-center content-center">
    <div class="col-lg-8" v-if="!showProfile">
      <q-form @submit="onSubmit" class="q-gutter-md q-mt-sm">
        <div class="row justify-start items-start">
          <p class="q-ma-sm body-1 col-12">
            Update your Profile
          </p>

          <div class="col-12 col-md-6">
            <q-input
              outlined
              :value="currentEmail"
              label="Email"
              label-color="accent"
              dense
              hint="Email verification will be required to update email."
              class="q-ma-sm"
              disable
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-user" size="xs" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-md-6 text-right">
            <q-btn
              @click="showUpdateEmail = true"
              color="primary"
              dense
              class="q-ma-sm q-pa-xs"
              >Update Email</q-btn
            ><q-btn
              @click="showUpdatePwd = true"
              color="accent"
              dense
              class="q-ma-sm q-pa-xs"
              >Update Password</q-btn
            >
          </div>

          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.profileData.firstname.$model"
              label="First Name"
              label-color="accent"
              hint="Given Name"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.profileData.firstname.$invalid &&
                  $v.profileData.firstname.$dirty
              "
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-user" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.profileData.firstname.required">
                  This field is required.
                </div>
                <div v-if="!$v.profileData.firstname.minLength">
                  Must contain at least 2 characters.
                </div>
                <div v-if="!$v.profileData.firstname.maxLength">
                  Cannot be over 30 characters.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.profileData.lastname.$model"
              label="Family Name"
              label-color="accent"
              hint="Surname"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.profileData.lastname.$invalid &&
                  $v.profileData.lastname.$dirty
              "
              error-message="Must be at least 2 characters"
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-user" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.profileData.lastname.required">
                  This field is required.
                </div>
                <div v-if="!$v.profileData.lastname.minLength">
                  Must contain at least 2 characters.
                </div>
                <div v-if="!$v.profileData.lastname.maxLength">
                  Cannot be over 30 characters.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.profileData.company.$model"
              label="Company"
              label-color="accent"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.profileData.company.$invalid && $v.profileData.company.$dirty
              "
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-building" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.profileData.company.minLength">
                  Must contain at least 2 characters.
                </div>
                <div v-if="!$v.profileData.company.maxLength">
                  Cannot be over 30 characters.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.profileData.city.$model"
              label="City"
              label-color="accent"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="
                $v.profileData.city.$invalid && $v.profileData.city.$dirty
              "
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-city" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.profileData.city.minLength">
                  Must contain at least 2 characters.
                </div>
                <div v-if="!$v.profileData.city.maxLength">
                  Cannot be over 30 characters.
                </div>
              </template>
            </q-input>
          </div>

          <div class="q-pa-sm text-right">
            <q-btn
              :disable="disableUpdateProfile"
              :loading="submitting"
              label="Update Account"
              type="submit"
              color="positive"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
      </q-form>
    </div>
    <div class="col-lg-8" v-if="showUpdatePwd">
      <q-form @submit="updatePassword" class="q-gutter-md q-mt-sm">
        <div class="row justify-start items-start">
          <p class="q-ma-sm body-1 col-12">
            <a @click="showUpdatePwd = false" class="cursor-pointer"
              >Back to Account</a
            >
          </p>
          <p class="q-ma-sm body-1 col-12">
            Update Your Password
          </p>

          <div class="col-12">
            <q-input
              outlined
              v-model="$v.passwordData.currentPassword.$model"
              label-color="accent"
              label="Confirm Current Password"
              type="password"
              lazy-rules
              dense
              class="q-ma-sm"
              hint="Enter your current password."
              :error="
                $v.passwordData.currentPassword.$invalid &&
                  $v.passwordData.currentPassword.$dirty
              "
              error-message=""
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-lock" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.passwordData.currentPassword.required">
                  This field is required.
                </div>
                <div v-if="!$v.passwordData.currentPassword.minLength">
                  Password must be at least 8 characters.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.passwordData.password.$model"
              label-color="accent"
              label="New Password"
              type="password"
              lazy-rules
              dense
              class="q-ma-sm"
              hint="Create a password. 8 character minimum."
              :error="
                $v.passwordData.password.$invalid &&
                  $v.passwordData.password.$dirty
              "
              error-message=""
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-lock" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.passwordData.password.required">
                  This field is required.
                </div>
                <div v-if="!$v.passwordData.password.minLength">
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
              v-model="$v.passwordData.confirmPassword.$model"
              label="Confirm New Password"
              lazy-rules
              dense
              hint="Confirm new password"
              class="q-ma-sm"
              :error="
                $v.passwordData.confirmPassword.$invalid &&
                  $v.passwordData.confirmPassword.$dirty
              "
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-lock" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.passwordData.confirmPassword.sameAsPassword">
                  Passwords must match.
                </div>
              </template>
            </q-input>
          </div>

          <div class="q-pa-sm text-right">
            <q-btn
              :disable="disableUpdatePassword"
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
      </q-form>
    </div>
    <div class="col-lg-8" v-if="showUpdateEmail">
      <q-form @submit="updateEmail" class="q-gutter-md q-mt-sm">
        <div class="row justify-start items-start">
          <p class="q-ma-sm body-1 col-12">
            <a @click="showUpdateEmail = false" class="cursor-pointer"
              >Back to Account</a
            >
          </p>
          <p class="q-ma-sm body-1 col-12">
            Update Your Email - Email must be verified before account is
            updated.
          </p>
          <div class="col-12">
            <q-input
              outlined
              v-model="$v.emailData.currentPassword.$model"
              label-color="accent"
              label="Confirm Current Password"
              type="password"
              lazy-rules
              dense
              class="q-ma-sm"
              hint="Enter your current password."
              :error="
                $v.emailData.currentPassword.$invalid &&
                  $v.emailData.currentPassword.$dirty
              "
              error-message=""
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-lock" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.emailData.currentPassword.required">
                  This field is required.
                </div>
                <div v-if="!$v.emailData.currentPassword.minLength">
                  Password must be at least 8 characters.
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.emailData.email.$model"
              label-color="accent"
              label="Email"
              type="email"
              hint="Verifiable Email Address"
              lazy-rules
              dense
              class="q-ma-sm"
              :error="$v.emailData.email.$invalid && $v.emailData.email.$dirty"
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-envelope" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.emailData.email.required">
                  This field is required.
                </div>
                <div v-if="!$v.emailData.email.email">
                  Please provide a valid email address
                </div>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="$v.emailData.confirmEmail.$model"
              label-color="accent"
              label="Confirm Email"
              type="text"
              lazy-rules
              hint="Confirm email address"
              dense
              class="q-ma-sm"
              :error="
                $v.emailData.confirmEmail.$invalid &&
                  $v.emailData.confirmEmail.$dirty
              "
            >
              <template v-slot:prepend>
                <q-icon color="accent" name="fas fa-envelope" size="xs" />
              </template>
              <template v-slot:error>
                <div v-if="!$v.emailData.confirmEmail.sameAsEmail">
                  Emails must match.
                </div>
              </template>
            </q-input>
          </div>

          <div class="q-pa-sm text-right">
            <q-btn
              :disable="disableUpdateEmail"
              :loading="submitting"
              label="Update Email"
              type="submit"
              color="positive"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z0-9 ]*$/);

export default {
  data() {
    return {
      valid: false,
      showUpdatePwd: false,
      showUpdateEmail: false,
      profileData: {
        firstname: "",
        lastname: "",
        company: "",
        city: ""
      },
      emailData: {
        currentPassword: "",
        email: "",
        confirmEmail: ""
      },
      passwordData: {
        password: "",
        confirmPassword: "",
        currentPassword: ""
      }
    };
  },
  validations: {
    profileData: {
      firstname: {
        alpha,
        required,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      lastname: {
        alpha,
        required,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      company: {
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(30)
      },
      city: {
        alpha,
        minLength: minLength(2),
        maxLength: maxLength(30)
      }
    },
    emailData: {
      currentPassword: {
        required,
        minLength: minLength(8)
      },
      email: {
        required,
        email
      },
      confirmEmail: {
        sameAsEmail: sameAs(emailData => {
          return emailData.email;
        })
      }
    },
    passwordData: {
      currentPassword: {
        required,
        minLength: minLength(8)
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs(passwordData => {
          return passwordData.password;
        })
      }
    }
  },
  mounted: function() {
    this.setData();
  },
  computed: {
    ...mapState({
      submitting: state => state.auth.showLoading
    }),
    showProfile() {
      return this.showUpdatePwd || this.showUpdateEmail;
    },
    disableUpdateProfile() {
      return this.$v.profileData.$invalid;
    },
    disableUpdatePassword() {
      return this.$v.passwordData.$invalid;
    },
    disableUpdateEmail() {
      return this.$v.emailData.$invalid;
    },
    currentEmail() {
      if (this.$store.state.auth.user) {
        return this.$store.state.auth.user.email;
      }
      return null;
    }
  },
  methods: {
    setData() {
      let user = this.$store.state.auth.user;
      if (user) {
        this.profileData.firstname = user.firstname;
        this.profileData.lastname = user.lastname;
        this.profileData.city = user.city;
        this.profileData.company = user.company;
      }
    },
    onSubmit() {
      this.$store.dispatch("account/updateProfile", {
        id: this.$store.state.auth.user._id,
        profileData: this.profileData
      });
    },
    updatePassword() {
      this.$store.dispatch("account/updatePasswordFromProfile", {
        email: this.currentEmail,
        oldPassword: this.passwordData.currentPassword,
        newPassword: this.passwordData.password
      });
      this.passwordData.password = "";
      this.passwordData.confirmPassword = "";
      this.passwordData.currentPassword = "";
    },
    updateEmail() {
      this.$store.dispatch("account/updateIdentity", {
        password: this.emailData.currentPassword,
        currentEmail: this.currentEmail,
        updatedEmail: this.emailData.email
      });
      this.showUpdateEmail = false;
      this.emailData.currentPassword = "";
      this.emailData.email = "";
      this.emailData.confirmEmail = "";
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
