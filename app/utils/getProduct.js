const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllProduct(){

    const res = await fetch(`${baseUrl}/products`, {
        next: {
            revalidate: 10
        }

    });

    if(!res.ok){
        throw new Error('Failed to fetch product');
    }

    return res.json()
}

export async function getProduct(uuid){
    const res = await fetch(`${baseUrl}/product/${uuid}`);

    if(!res.ok){
        throw new Error('Failed to fetch product');
    }

    return res.json();
}
