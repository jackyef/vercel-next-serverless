import * as React from 'react';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Divider,
  useColorMode,
  Switch,
  FormLabel,
  theme,
} from '@chakra-ui/core';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { PrivateRoute } from '../components/Route/Private';
import FullPageLoader from '../components/Spinner/FullPage';
import { PageWrapper } from '../components/Wrapper/Page';
import { AuthContext } from '../context/Auth';
import { SubscriptionContext } from '../context/NewsletterSubscription';

const AccountPage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signout } = React.useContext(AuthContext);
  const { subscribed, askToSubscribe } = React.useContext(SubscriptionContext);

  return (
    <PageWrapper title="My Account" header bottomNavBar>
      <PrivateRoute fallback={<FullPageLoader message="Authenticating..." />}>
        <Stack spacing={4}>
          <Heading as="h1">
            Your account
          </Heading>
          <Stack spacing={2}>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              marginY={'1rem'}
            >
              <Text>Name</Text>
              <Text fontSize="sm">{user.name}</Text>
            </Flex>
            <Divider />
            <Flex
              alignItems="center"
              justifyContent="space-between"
              marginY={'1rem'}
            >
              <Text>E-mail address</Text>
              <Text fontSize="sm">{user.email}</Text>
            </Flex>
            <Divider />
            <Flex
              alignItems="center"
              justifyContent="space-between"
              marginY={'1rem'}
            >
              <FormLabel htmlFor="dark-mode-toggle">Dark theme</FormLabel>
              <Switch
                size="lg"
                id="dark-mode-toggle"
                isChecked={colorMode === 'dark'}
                onChange={toggleColorMode}
              />
            </Flex>
            <Divider />
            <Flex
              alignItems="center"
              justifyContent="space-between"
              marginY={'1rem'}
              onClick={subscribed ? undefined : askToSubscribe}
              as="button"
            >
              <Text>{subscribed ? 'You are already subscribed to our newsletter' : 'Subscribe to our newsletter'}</Text>
            </Flex>
            <Divider />
            <Stack
              isInline
              spacing={2}
              alignItems="center"
              marginY={'1rem'}
              color="var(--button-bg-error)"
              onClick={() => signout({ callbackUrl: '/' })}
              as="button"
            >
              <RiLogoutBoxLine />
              <Text marginLeft={theme.space[2]}>Sign out</Text>
            </Stack>
            <Divider />
          </Stack>
        </Stack>
      </PrivateRoute>
    </PageWrapper>
  );
};

export default AccountPage;
