import { useGetMyUser, useUpdateMyUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { Spinner } from "@nextui-org/react";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return (
      <Spinner size="lg" className="flex items-center justify-center m-2" />
    );
  }

  if (!currentUser) {
    return (
      <span className="flex items-center justify-center m-2 capitalize text-large">
        Unable to load user profile
      </span>
    );
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
