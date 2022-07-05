const createSlice = require("@reduxjs/toolkit").createSlice;
const initialState = {
  numOficeCreams: 20,
};
const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOficeCreams--;
    },
    restocked: (state, action) => {
      state.numOficeCreams += action.payload;
    },
  },
});

module.exports = icecreamSlice.reducer
module.exports.icecreamActions = icecreamSlice.actions