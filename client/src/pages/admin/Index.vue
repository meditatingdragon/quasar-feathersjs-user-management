<template>
  <q-page class="flex flex-center content-start">
    <q-table
      :dense="$q.screen.lt.md"
      title="Users"
      :data="users"
      :columns="columns"
      row-key="name"
      class="q-pa-md q-ma-md"
      :pagination.sync="paginationOpts"
      @request="getTableUsers"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          {{ props.row.firstname }} {{ props.row.lastname }}
        </q-td>
      </template>
      <template v-slot:body-cell-role="props">
        <q-td class="text-capitalize">
          {{ props.row.permissions ? props.row.permissions[0] : "" }}
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            dense
            class="q-pa-xs q-mx-xs"
            color="primary"
            title="Edit User"
            @click="updateUser(props.row)"
            >Edit User
          </q-btn>
          <q-btn
            size="sm"
            dense
            class="q-pa-xs q-mx-xs"
            color="purple"
            title="Reset Password"
            @click="resetPassword(props.row.email)"
            >Reset Password</q-btn
          >
          <q-btn
            size="sm"
            dense
            class="q-pa-xs q-mx-xs"
            color="orange"
            title="Impersonate User"
            @click="impersonate(props.row._id)"
            >Impersonate</q-btn
          >
          <q-btn
            size="sm"
            dense
            class="q-pa-xs q-mx-xs"
            color="red"
            title="Deactivate User"
            @click="deactiveateUser(props.row)"
            >Deactivate User</q-btn
          >
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="showEditUser" persistent>
      <q-card>
        <q-card-section class="row items-center">
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
        </q-card-section>
        <q-card-section>
          <div class="col-12">
            <q-select
              dense
              class="q-ma-sm text-capitalize"
              outlined
              v-model="$v.profileData.role.$model"
              :options="roles"
              label="User Role"
              popup-content-class="text-capitalize"
              options-selected-class="primary"
              :error="
                $v.profileData.role.$invalid && $v.profileData.role.$dirty
              "
            >
              <template v-slot:error>
                <div v-if="!$v.profileData.role.required">
                  Must have a role.
                </div>
              </template>
            </q-select>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" flat v-close-popup />
          <q-btn
            v-if="!selectedUser.isVerified"
            @click="resendEmailVerification(selectedUser.email)"
            label="Resend Email Verification"
            color="secondary"
            v-close-popup
          />
          <q-btn
            @click="saveUpdatedUser"
            :disable="disableUpdateProfile"
            label="Update User"
            type="submit"
            color="positive"
            v-close-popup
          >
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { date } from "quasar";

export default {
  mounted: function() {
    this.getTableUsers();
    this.setPagination();
  },
  data() {
    return {
      roles: ["guest", "user", "admin", "inactive"],
      selectedUser: {},
      showEditUser: false,
      paginationOpts: {
        sortBy: "lastLoggedIn",
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 10
      },
      profileData: {
        firstname: "",
        lastname: "",
        company: "",
        city: "",
        role: ""
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left"
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "company",
          align: "center",
          label: "Company",
          field: "company",
          sortable: true
        },
        {
          name: "status",
          align: "center",
          label: "Status",
          field: "isVerified",
          format: val => {
            if (val) {
              return `Confirmed`;
            } else return `Pending`;
          },
          sortable: false
        },
        {
          name: "role",
          align: "center",
          label: "Role",
          field: "permissions",
          sortable: false
        },
        {
          name: "lastLoggedIn",
          align: "center",
          label: "Last Seen",
          field: "lastLoggedIn",
          sortable: true,
          format: val =>
            `${val ? date.formatDate(val, "DD MMM YY HH:mm A") : "Unknown"}`
        },
        {
          name: "action",
          align: "center",
          label: "Action"
        }
      ]
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
      },
      role: {
        required
      }
    }
  },
  computed: {
    ...mapState({
      users: state => state.admin.users
    }),
    disableUpdateProfile() {
      return this.$v.profileData.$invalid;
    }
  },
  methods: {
    setPagination() {
      this.paginationOpts = this.$store.state.admin.userPaginationOpts;
    },
    async getTableUsers(requestProp) {
      if (requestProp) {
        this.paginationOpts = requestProp.pagination;
        this.$store.commit("admin/setUserPagination", {
          userPaginationOpts: requestProp.pagination
        });
        await this.getUsers({ paginationOpts: requestProp.pagination });
      } else {
        await this.getUsers({ paginationOpts: this.paginationOpts });
      }
      this.paginationOpts.rowsNumber = this.$store.state.admin.userPaginationOpts.rowsNumber;
    },
    ...mapActions({
      getUsers: "admin/getUsers"
    }),
    updateUser(user) {
      this.profileData.firstname = user.firstname;
      this.profileData.lastname = user.lastname;
      this.profileData.city = user.city;
      this.profileData.company = user.company;
      this.profileData.role = user.permissions ? user.permissions[0] : "";
      this.showEditUser = true;
      this.selectedUser = user;
    },
    resendEmailVerification(email) {
      this.$store.dispatch("account/resendVerification", {
        email: email
      });
    },
    async saveUpdatedUser() {
      this.profileData.permissions = [this.profileData.role];
      let userData = { ...this.profileData };
      delete userData.role;
      this.$store.dispatch("account/updateUser", {
        user: userData,
        id: this.selectedUser._id,
        paginationOpts: this.paginationOpts
      });
    },
    impersonate(id) {},
    resetPassword(email) {
      this.$store
        .dispatch("account/forgotPassword", {
          emailAddress: email
        });
    },
    async deactiveateUser(user) {
      this.profileData.firstname = user.firstname;
      this.profileData.lastname = user.lastname;
      this.profileData.city = user.city;
      this.profileData.company = user.company;
      this.profileData.permissions = ["inactive"];
      let userData = { ...this.profileData };
      delete userData.role;
      this.$store.dispatch("account/updateUser", {
        user: userData,
        id: user._id,
        paginationOpts: this.paginationOpts
      });
    }
  }
};
</script>
<style lang="scss"></style>
