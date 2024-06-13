const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

<<<<<<< HEAD
export async function getAllProduct(search){
    if(search){
        const res = await fetch(`${baseUrl}/products?search=${search}`, {
            next: {
                revalidate: 10
            }
        });

=======
export async function getAllProduct(search = null,page=1){

        const res = await fetch(`${baseUrl}/products?perPage=4&page=${page}&search=${search}`, {
            next: {
                revalidate: 10
            }
        });

>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7
        if(!res.ok){
            throw new Error('Failed to fetch product');
        }

        return res.json();
<<<<<<< HEAD
    } else{
        const res = await fetch(`${baseUrl}/products`, {
            next: {
                revalidate: 10
            }
        });

        if(!res.ok){
            throw new Error('Failed to fetch product');
        }

        return res.json();
    }
=======
>>>>>>> 38a2c2171e85843aaab8fc9426f070184aa242f7
}

export async function getProduct(uuid){
    const res = await fetch(`${baseUrl}/product/${uuid}`);

    if(!res.ok){
        throw new Error('Failed to fetch product');
    }

    return res.json();
}

// export async function getProductBySearch(search) {
//     const res = await fetch(
//         `${baseUrl}/products?search=${search}`,
//         {
//             next: {
//                 revalidate: 10,
//             },
//         }
//     );

//     if (!res.ok) {
//         throw new Error('Failed to fetch product');
//     }

//     return res.json();
// }
