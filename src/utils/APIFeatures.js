

export class APIFeatures{

    constructor(mongooseQuery,queryString)
    {
        this.mongooseQuery=mongooseQuery;
        this.queryString=queryString;
    }

    paginate()
    {

        const pageLIMTI = 30;
        let PAGE = (this.queryString.page)*1 || 1;

        
        if(PAGE < 0)
            PAGE=1;

        const SKIP = (PAGE-1)*pageLIMTI;
        this.mongooseQuery.skip(SKIP).limit(pageLIMTI);

        return this;

    }

    filter()
    {
        let filter={...this.queryString};

        const excludedQuery = ['page','sort','fields','keyword'];

        excludedQuery.forEach((elementArray) => {
            delete filter[elementArray];    
        });

        filter = JSON.stringify(filter);

        filter = filter.replace(/\bgt|gte|lt|lte\b/g,match=>`$${match}`);

        filter = JSON.parse(filter);
        

        this.mongooseQuery.find(filter);
        

        return this;
    }

    sort()
    {
        if(this.queryString.sort)
        {
            const sortedBy = this.queryString.sort.split(',').join(' ');
        
            this.mongooseQuery.sort(sortedBy);
        }
        

        return this;
    }

    search()
    {
        if(this.queryString.keyword)
        {
            this.mongooseQuery.find({ $or: [ { title: {$regex: this.queryString.keyword,$options:'i'} }
            , { description: {$regex: this.queryString.keyword,$options:'i'}} ] });
        }
        
        return this;
    }

    selectedFields()
    {
        if(this.queryString.fields)
        {
            const fields = this.queryString.fields.split(',').join(' ');
            
            this.mongooseQuery.select(fields);
        }
        
        return this;
    }


}