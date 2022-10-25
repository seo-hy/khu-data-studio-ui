import axios from "axios";

const cleaning = {
  find(request) {
    return axios.post(
      "/cleaning-api/missing-value/find",
      request
    );
  },
  process(method, request) {
    return axios.post(
      "/cleaning-api/missing-value/process?method=" +
        method,
      request
    );
  },
};

export default cleaning;
