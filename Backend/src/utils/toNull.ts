export const toNullableFields = (obj:any) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, value ?? null])
    );
}
