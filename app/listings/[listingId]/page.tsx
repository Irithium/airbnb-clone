import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  console.log("EMPIEZA A COPIAR DESDE AQUÍ CAPO, SE QUE LO LOGRARÁS");
  console.log("SOY PARAMS", params);
  console.log("typeof params.listingId", typeof params.listingId);
  console.log("JSON.stringify(params)", JSON.stringify(params));

  try {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    console.log("SOY PARAMS", params);
    console.log("typeof params.listingId", typeof params.listingId);
    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <ListingClient listing={listing} currentUser={currentUser} />
      </ClientOnly>
    );
  } catch (error) {
    console.error("Error en ListingPage:", error);
  }
};

export default ListingPage;
