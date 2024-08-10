const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getSiteSettings() {
    const res = await fetch(`${baseUrl}/site-settings`,
        {
            next: {
                revalidate: 10,
            },
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch Site Settings');
    }

    return res.json();
}
