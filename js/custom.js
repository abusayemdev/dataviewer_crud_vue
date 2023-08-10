let app = new Vue({
    el: ".app",
    
    data: {
        products: [],
        form: {
            product_name: null,
            product_brand: null,
            product_price: null
        },
        updateProduct: {},
        productAddModel: false,
        productUpdateModel:false,
        errorMessage: null,
        successMessage: null
    },

    methods: {
        getData: function () {
            axios.get("http://localhost/vuecrud/api.php?action=read")
                 .then(function (response) {
                     if (!response.data.error) {
                        app.products = response.data.products;
                     }else{
                         app.errorMessage = response.data.message;

                     }
                
            });
            
        },

        addNewProduct: function () {
            let  formData = this.toFormData(this.form);

            axios.post("http://localhost/vuecrud/api.php?action=create", formData)
            .then( function (response) {
                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } else {
                    app.form.product_name = null;
                    app.form.product_brand = null;
                    app.form.product_price = null;
                    app.getData();
                    app.successMessage = response.data.message;
                }
                
            });
        },

        toFormData: function (obj) {
            let data = new FormData();

            for (let key in obj) {
                data.append(key, obj[key]);

            }

            return data;
            
        },

        clearMessage: function () {
            this.errorMessage = null;
            this.successMessage = null;
        },

        deleteProduct: function (id) {
            let  formData = this.toFormData({id:id});

            axios.post("http://localhost/vuecrud/api.php?action=delete", formData)
            .then( function (response) {
                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } else {
                    app.successMessage = response.data.message;
                    app.getData();
                    
                }
                
            });
            
        },

        setUpdateData: function (product) {
            this.updateProduct =  product;
            
        },

        updateProductData: function () {
            let  formData = this.toFormData(this.updateProduct);

            axios.post("http://localhost/vuecrud/api.php?action=update", formData)
            .then( function (response) {
                if (response.data.error) {
                    app.errorMessage = response.data.message;
                } else {
                    app.updateProduct = null;
                    app.getData();
                    app.successMessage = response.data.message;
                }
                
            });
        }
    },

    mounted: function () {
        this.getData();
    } 
});