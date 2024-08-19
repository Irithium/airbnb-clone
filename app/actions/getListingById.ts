import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });
    console.log("Soy LISTINGID", listingId);
    console.log("SOY LISTING EN getListingById", listing);

    if (!listing) return null;

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        email: listing.user.emailVerified
          ? listing.user.emailVerified.toISOString()
          : null,
      },
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(`Error fetching listing: ${error.message}`);
  }
}
