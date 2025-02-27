import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCalendar } from "@/context/UseCalendar";
function ConfirmationDialog({ handleSubmit }: { handleSubmit: Function }) {
  const { months } = useCalendar();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button
        my={1}
        mx={2}
        borderRadius={"full"}
        colorScheme="blue"
        w="fit-content"
        onClick={onOpen}
      >
        التالى
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            ></AlertDialogHeader>

            <AlertDialogBody>هل تريد حفظ التعديلات؟</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={() => {
                  handleSubmit();
                  localStorage.setItem("months", JSON.stringify(months));
                  router.push("/subjects");
                }}
                ms={3}
              >
                حفظ
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  localStorage.setItem("months", JSON.stringify(months));
                  router.push("/subjects");
                }}
                mx={3}
              >
                متابعة بدون حفظ
              </Button>
              <Button ref={cancelRef} onClick={onClose}>
                الغاء
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
export default ConfirmationDialog;
