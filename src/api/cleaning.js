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
  std(request) {
    return axios.post("/cleaning-api/std", request);
  },
  mean(request) {
    return axios.post("/cleaning-api/mean", request);
  },
  visualize(request, dateTimeColumn) {
    return axios.post(
      "/cleaning-api/visualize?date_time_column=" +
        dateTimeColumn,
      request
    );
  },
};

export default cleaning;
