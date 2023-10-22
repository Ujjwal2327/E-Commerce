class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(){
    const keyword = this.queryString.keyword ? {
      name: {
        $regex: this.queryString.keyword,   // regex for search
        $options: "i"   // case insensitive
      }
    } : {};

    // const keyword = {
    //   name: {
    //     $regex: this.queryString.keyword || "",   // regex for search
    //     $options: "i"   // case insensitive
    //   }
    // };

    // console.log(keyword); 

    this.query = this.query.find({...keyword}); // find all products with keyword
    // this.query = this.query.find(keyword); // find all products with keyword
    return this;
  }

  filter(){
    const queryCopy = {...this.queryString};

    // removing fields from the query
    const removeFields = ["keyword", "limit", "page"];

    // console.log(queryCopy);
    removeFields.forEach(key => delete queryCopy[key]);
    // console.log(queryCopy);

    // filter for price range   convert price: { lte: 100 } to price: { $lte: 100 }
    // console.log(queryCopy);
    let queryCopyStr = JSON.stringify(queryCopy);
    queryCopyStr = queryCopyStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    // console.log(queryCopyStr);

    this.query = this.query.find(JSON.parse(queryCopyStr));   // find all products with query filters

    return this;
  }

  pagination(resultsPerPage){
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    // this.query = this.query.skip(skip).limit(resultsPerPage);

    return this;
  }
}

export default ApiFeatures;