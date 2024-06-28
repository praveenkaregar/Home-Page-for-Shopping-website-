document.addEventListener('DOMContentLoaded', function() {
    const categories = [
        {
            name: "Fashion",
            subcategories: [
                {
                    name: "Men",
                    subcategories: [
                        { name: "Ethnic Wear" },
                        { name: "Western Wear" }
                    ]
                },
                {
                    name: "Women",
                    subcategories: [
                        { name: "Ethnic Wear" },
                        { name: "Western Wear" }
                    ]
                }
            ]
        },
        {
            name: "Electronics",
            subcategories: [
                { name: "Mobiles" },
                { name: "Laptops" },
                { name: "Cameras" }
            ]
        }
    ];

    function createCategoryList(categories, parentElement) {
        categories.forEach(category => {
            const li = document.createElement('li');
            li.classList.add('collection-item', 'category-item');
            li.textContent = category.name;

            if (category.subcategories) {
                const sublist = document.createElement('ul');
                sublist.classList.add('subcategories');
                createCategoryList(category.subcategories, sublist);
                li.appendChild(sublist);
            }

            parentElement.appendChild(li);
        });
    }

    const categoriesElement = document.getElementById('categories');
    createCategoryList(categories, categoriesElement);

    const typeaheadInput = document.getElementById('typeahead');
    const typeaheadResults = document.getElementById('typeahead-results');

    typeaheadInput.addEventListener('input', function() {
        const query = typeaheadInput.value.toLowerCase();
        typeaheadResults.innerHTML = '';

        if (query.length > 1) {
            const results = searchCategories(categories, query);
            results.forEach(result => {
                const li = document.createElement('li');
                li.classList.add('collection-item');
                li.textContent = result;
                typeaheadResults.appendChild(li);
            });
        }
    });

    function searchCategories(categories, query) {
        let results = [];

        categories.forEach(category => {
            if (category.name.toLowerCase().includes(query)) {
                results.push(category.name);
            }

            if (category.subcategories) {
                const subResults = searchCategories(category.subcategories, query);
                results = results.concat(subResults);
            }
        });

        return results;
    }

    document.addEventListener('click', function(event) {
        if (!typeaheadResults.contains(event.target) && event.target !== typeaheadInput) {
            typeaheadResults.innerHTML = '';
        }
    });
});
