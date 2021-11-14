class Requests {
    private baseUrl: string = '';
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
  
    public async get(endpoint: string): Promise<any> {
        try {
            const r = await fetch(this.baseUrl + endpoint, {method: 'GET'});
            if(r.ok) {
                return r.json();
            }
        } catch(err) {
            throw(err);
        }
    }
  
    public async post(endpoint: string): Promise<{status: number, data: any}> {
        try {
            const r = await fetch(this.baseUrl + endpoint, {method: 'POST'});
            const data = await r.json();
            return {status: r.status, data};
        } catch(err) {
            throw(err);
        }
    }
  
    public async delete(endpoint: string): Promise<any> {
      try {
          const r = await fetch(this.baseUrl + endpoint, {method: 'DELETE'});
          return r.json();
      } catch(err) {
          throw(err);
      }
    }

  }

  export class Logging  extends Requests{
      constructor(baseUrl: string) {
          super(baseUrl);
      }
      
      public LOG(msg: string, err?: Error) {
          console.log(msg + ' ' + err);
      }
  }
  
  console.log(process.env.REACT_APP_BASE_URL);
  const requestsAndLogging = new Logging(process.env.REACT_APP_BASE_URL!);
  const req = requestsAndLogging;
  export default req;