import { auth, db } from '@/firebase/firebaseInit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const state = {
  user: null,
  profileAdmin: null,
  profileEmail: null,
  profileFirstName: null,
  profileLastName: null,
  profileUsername: null,
  profileId: null,
  profileInitials: null,
}

const mutations = {
  setProfileInfo(state, userDoc) {
    state.profileId = userDoc.id;
    state.profileEmail = userDoc.data().email;
    state.profileFirstName = userDoc.data().firstName;
    state.profileLastName = userDoc.data().lastName;
    state.profileUsername = userDoc.data().username;
  },
  setProfileInitials(state) {
    state.profileInitials = 
      state.profileFirstName.match(/(\b\S)?/g).join("") +
      state.profileLastName.match(/(\b\S)?/g).join("");
  },
  updateUser(state, payload) {
    state.user = payload;
  },
  setUserFirstName: (state, firstName) => state.profileFirstName = firstName,
  setUserLastName: (state, lastName) => state.profileLastName = lastName,
  setUserUsername: (state, username) => state.profileUsername = username,
  setUserEmail: (state, email) => state.profileEmail = email,
  setProfileAdmin: (state, admin) => state.profileAdmin = admin,
}

const getters = {
  getUserInitials: state => state.profileInitials,
  getUserFirstName: state => state.profileFirstName,
  getUserLastName: state => state.profileLastName,
  getUserUsername: state => state.profileUsername,
  getUserEmail: state => state.profileEmail,
  getProfileAdmin: state => state.profileAdmin,
  getProfileId: state => state.profileId,
  getUser: state => state.user,
}

const actions = {
  async getCurrentUser({ commit }, user) {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const document = await getDoc(docRef);
    commit('setProfileInfo', document);
    commit('setProfileInitials');
    const token = await user.getIdTokenResult();
    const admin = await token.claims.admin;
    commit('setProfileAdmin', admin )
  },
  updateUser({ commit }, payload) {
    commit('updateUser', payload)
  },
  setUserFirstName: ({ commit }, firstName) => commit('setUserFirstName', firstName),
  setUserLastName: ({ commit }, lastName) => commit('setUserLastName', lastName),
  setUserUsername: ({ commit }, username) => commit('setUserUsername', username),
  setUserEmail: ({ commit }, email) => commit('setUserEmail', email),
  async updateUserSettings({ commit }){
    const docRef = doc(db, 'users', state.profileId);
    await updateDoc(docRef, {
      firstName: state.profileFirstName,
      lastName: state.profileLastName,
      username: state.profileUsername,
    })
    commit('setProfileInitials');
  },
}

export default {
  state,
  mutations,
  getters,
  actions
}
