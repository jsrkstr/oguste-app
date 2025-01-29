interface UserDataConversation {
    id: string;
    property_id: string;
    user_id: string;
    label: string;
  }

  interface UserDataProperty {
    id: string;
    name: string;
    description: string;
    organisation_id: string;
    user_id: string;
    conversations: [UserDataConversation];
  }

  interface UserData {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    organisation: {
      id: string;
      name: string;
    }
    properties: [UserDataProperty];
  }