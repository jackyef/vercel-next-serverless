import * as React from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import { AuthContext } from '../Auth';
import {
  useToast,
  useDisclosure,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/core';
import { Button } from '../../components/Button';

interface SubscriptionState {
  subscribed: boolean;
  askToSubscribe: () => any;
}

const initialState = {
  subscribed: false,
  askToSubscribe: () => {},
};

export const SubscriptionContext = React.createContext<SubscriptionState>(
  initialState,
);

const newsletterSubscriptionCacheKey = 'newsletter-subscription';

const subscriptionCheckEndpoint = '/api/newsletter/check';
const subscribeEndpoint = '/api/newsletter/subscribe';

export const NewsletterSubscriptionProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = React.useContext(AuthContext);
  const { data } = useQuery(
    newsletterSubscriptionCacheKey,
    () => {
      return fetch(subscriptionCheckEndpoint).then((res) => res.json());
    },
    {
      enabled: isAuthenticated,
    },
  );
  const [subscribeToNewsletter, { isLoading: isSubscribing }] = useMutation(
    () => {
      return fetch(subscribeEndpoint, { method: 'POST' }).then((res) =>
        res.json(),
      );
    },
    {
      onSuccess: () => {
        // update the subscription cache
        queryCache.cancelQueries(newsletterSubscriptionCacheKey);

        queryCache.setQueryData(newsletterSubscriptionCacheKey, () => ({
          status: 'SUBSCRIBED',
        }));

        // show toast
        toast({
          title: `Success`,
          description: 'You have been added to our newsletter subscription!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: `Error`,
          description:
            'Uh-oh! Something bad happened when trying to add you to our newsletter.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      },
      onSettled: () => onClose(),
    },
  );

  const handleSubscribe = () => {
    subscribeToNewsletter();
  };

  const subscriptionAPIs: SubscriptionState = {
    subscribed: data?.status === 'SUBSCRIBED',
    askToSubscribe: onOpen,
  };

  return (
    <SubscriptionContext.Provider value={subscriptionAPIs}>
      {children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader>Subscribe to our newsletter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>We will only send you good information, no spams!</p>
            <p>Sounds good?</p>
          </ModalBody>
          <ModalFooter>
            <Stack isInline spacing={3}>
              <Button
                isLoading={isSubscribing}
                variantColor="primary"
                onClick={handleSubscribe}
              >
                Yes!
              </Button>
              <Button variantColor="error" onClick={onClose}>
                Nope
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SubscriptionContext.Provider>
  );
};
