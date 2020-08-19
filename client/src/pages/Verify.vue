<template>
  <div class="row justify-center items-center content-center">
    <div v-if="success" class="col-md-8 q-pa-lg text-center">
      Thanks for verifying your account.
    </div>
    <div v-else class="col-md-8 q-pa-lg text-center">
      Verifying account...please wait...
    </div>
  </div>
</template>
<script>
import userService from "../services/user";
import { Notify } from "quasar";

export default {
  data() {
    return {
      success: false
    };
  },
  mounted() {
    this.verifyAccount();
  },
  methods: {
    async verifyAccount() {
      let token = this.$route.query.token;
      let result;
      if (token) {
        result = await userService.verifyAccount(token).catch(err => {
          if (err.response) {
            let code = err.response.data.code;
            Notify.create({
              message: "Unable to verify account. Please contact support.",
              color: "negative"
            });
          }
        });
      }
      if (result && result.status === 201) {
        this.success = true;
        this.$router.push("/login");
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>
