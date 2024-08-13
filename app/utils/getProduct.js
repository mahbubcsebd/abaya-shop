const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllProduct(search = null, category = null, perPageShow = 12) {
    const res = await fetch(
        `${baseUrl}/products?perPage=${perPageShow}&search=${search}&category=${category}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    return res.json();
}

export async function getProduct(uuid) {
    const res = await fetch(`${baseUrl}/product/${uuid}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    return res.json();
}
