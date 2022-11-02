import axios from "axios";

const cleaning = {
  find(request) {
    return axios.post(
      "/cleaning-api/missing-value/find",
      request
    );
  },
  run(method, idxCol, request) {
    return axios.post(
      "/cleaning-api/missing-value/run?method=" +
        method +
        "&idx_col=" +
        idxCol,
      request
    );
  },
  pearsonCorrelation(request) {
    return axios.post(
      "/cleaning-api/pearson-correlation",
      request
    );
  },
};

export default cleaning;
