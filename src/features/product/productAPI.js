// A mock function to mimic making an async request for data
// export function fetchAllProduct() {
//   return new Promise(async (resolve) => {
//     //TODO: we will not hard-code server URL here
//     const response = await fetch('/products')
//     const data = await response.json()
//     resolve({ data })
//   }
//   );
// }

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('/products/'+id)
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function createProduct(product) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('/products/',{
      method : 'POST',
      body : JSON.stringify(product),
      headers : {'content-type' : 'application/json'}
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchProductByFilters(filter, sort, pagination, admin) {
  let queryString = '';
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length) {
      const lastCategoryValue = categoryValue[categoryValue.length-1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
  for (let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&` 
  }
  if(admin){
    queryString += `admin=true`
  }
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('/products?' + queryString);
    const data = await response.json()
    const totalItem = await response.headers.get('X-Total-Count')
    resolve({ data:{products:data, totalItem: +totalItem} })
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('/brands')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('/category')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/"+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {
        'content-type': 'application/json'
      }
    });
    const data = await response.json();
    resolve({ data });
  }
  );
}