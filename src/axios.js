import axios from "axios";
import jwt from 'jsonwebtoken';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
    //   return message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //User handling
  /** Register user */

  static async register(data) {
      let res = await this.request(`auth/register`,data,`post`)
      return res.token;
  }

  static async login(data) {
    let res = await this.request(`auth/token`,data,`post`)
    return res.token
  }

  static async getUser(username) {
    this.token = localStorage.token
    let res = await this.request(`users/${username}`)
    return(res.user)
  }

  static async editUser(data) {
    this.token = localStorage.token
    const {firstName,lastName,email} = data;
    const filteredData = {firstName,lastName,email}
    let res = await this.request(`users/${data.username}`,filteredData,`patch`)
  }

  static async apply(id){
    this.token = localStorage.token
    let user = jwt.decode(this.token)
    let res = await this.request(`users/${user.username}/jobs/${id}`,{}, `post`)
  }


  // Individual API routes
  /** Get details on all companies */

  static async getAllCompanies(filter) {
    let res = await this.request(`companies`);
    if(filter){
        let filteredComps = res.companies.filter(comp => 
          comp.name.includes(filter[0]) || comp.name.includes(filter[1])
        )
        res.companies = filteredComps;
      }
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all jobs */

  static async getAllJobs(filter) {
    let res = await this.request(`jobs`);
    if(filter){
      let filteredJobs = res.jobs.filter(job => 
        job.title.includes(filter[0])
      )
      res.jobs = filteredJobs;
    }
    
    return res.jobs;
  }

  /** Get details on a job by id */

  static async getJob(id) {
    
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;