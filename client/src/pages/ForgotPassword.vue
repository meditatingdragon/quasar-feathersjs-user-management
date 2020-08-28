<template>
  <q-page class="flex flex-center">
    <div>
      <q-form @submit="forgotPassword">
        <div class="row">
          <div class="col-12">
            <q-input
              outlined
              v-model="$v.resetEmail.$model"
              label-color="accent"
              label="Email"
              type="email"
              hint="Enter Email Account to Reset Password."
              lazy-rules
              dense
              class="q-ma-sm"
              :error="$v.resetEmail.$invalid && $v.resetEmail.$dirty"
            />
          </div>
          <div class="col-12 text-right">
            <q-btn
              :disable="resetValid"
              :loading="submitting"
              label="Reset Password"
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
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      valid: false,
      resetEmail: ""
    };
  },
  validations: {
    resetEmail: {
      required,
      email
    }
  },
  computed: {
    ...mapState({
      submitting: state => state.auth.showLoading
    }),
    resetValid() {
      return this.$v.resetEmail.$invalid;
    }
  },
  methods: {
    forgotPassword() {
      this.$store
        .dispatch("account/forgotPassword", {
          emailAddress: this.resetEmail
        })
        .then(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>
