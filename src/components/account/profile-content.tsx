import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRightIcon, BadgeCheckIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuthContext } from "@/providers/auth-provider";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Inputs = {
  delete_account: string;
};

export default function ProfileContent() {
  const { auth, updateUserDetails, getUserDevspaces, userDevspaces } =
    useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onDeleteSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Delete confirmed:", data);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form) return;
    // Compare old data with auth and add only items which are different in payload
    let data = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      username: form.username.value,
      avatar: form.avatar.files[0],
    };
    if (data.first_name === auth?.first_name) delete data.first_name;
    if (data.last_name === auth?.last_name) delete data.last_name;
    if (data.username === auth?.username) delete data.username;
    if (form.avatar.files.length > 0) {
      data.avatar = form.avatar.files[0];
    }
    if (Object.keys(data).length === 0) return;
    updateUserDetails(auth?.id, data);
  };

  useEffect(() => {
    getUserDevspaces();
  }, []);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      {/* Account Settings */}
      <Card id="#account-settings">
        <CardContent>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold">Account Settings</h3>
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600 cursor-pointer"
            >
              <BadgeCheckIcon />
              Verified
            </Badge>
          </div>
          <form
            method="POST"
            className="space-y-4"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <div className="grid gap-2">
              <Label htmlFor="avatar">Avatar</Label>
              <Input id="avatar" name="avatar" type="file" />
              <p className="text-sm text-destructive"></p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                defaultValue={auth?.first_name}
                id="first_name"
                name="first_name"
                type="text"
              />
              <p className="text-sm text-destructive"></p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                defaultValue={auth?.last_name}
                id="last_name"
                name="last_name"
                type="text"
              />
              <p className="text-sm text-destructive"></p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                defaultValue={auth?.username}
                id="username"
                name="username"
                type="text"
              />
              <p className="text-sm text-destructive"></p>
            </div>
            <Button type="submit" className="mt-4">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Dev Spaces List */}
      <Card id="#devspaces">
        <CardContent>
          <h3 className="text-xl font-semibold mb-4">Your Dev spaces</h3>
          {userDevspaces.length > 0 ? (
            <Table>
              <TableCaption>List of your dev spaces.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Private</TableHead>
                  <TableHead>Syntax</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userDevspaces.map((devspace, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {devspace?.title}
                      </TableCell>
                      <TableCell>
                        {devspace?.description || "No description"}
                      </TableCell>
                      <TableCell>
                        {devspace?.is_private ? (
                          <Badge className="cursor-pointer">Yes</Badge>
                        ) : (
                          <Badge className="cursor-pointer">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className="cursor-pointer">
                          {devspace?.syntax?.title}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-x-2 justify-end items-center">
                        <Link to={`/${devspace?.id}`}>
                          <Button size={"sm"}>Open</Button>
                        </Link>
                        <Button size={"sm"} variant={"destructive"}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Alert variant="destructive">
              <AlertTitle>No dev spaces found!</AlertTitle>
              <AlertDescription>
                You can create a new dev space, or fork from an existing one.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="border-red-500">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Delete Account
          </h3>
          <p className="text-sm mb-4">
            Deleting your account will remove all your data. This action is
            permanent.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <form
                method="POST"
                onSubmit={handleSubmit(onDeleteSubmit)}
                className="space-y-4"
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Please type
                    <code className="text-red-600 font-mono font-bold mx-1">
                      delete my account
                    </code>
                    to confirm.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-2">
                  <Label htmlFor="delete_account">Confirmation</Label>
                  <Input
                    id="delete_account"
                    {...register("delete_account", {
                      required: "This field is required",
                      pattern: {
                        value: /^delete my account$/i,
                        message: "You must type 'delete my account' exactly.",
                      },
                    })}
                  />
                  {errors.delete_account && (
                    <p className="text-sm text-destructive">
                      {errors.delete_account.message}
                    </p>
                  )}
                </div>

                <AlertDialogFooter className="pt-4">
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <Button type="submit" variant="destructive">
                    Continue
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
