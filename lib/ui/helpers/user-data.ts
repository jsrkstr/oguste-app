import { setAuthHeaders } from "@/lib/api/auth-service";
import { fetchUserData } from "@/lib/api/user-service";
import Conversation from "@/lib/models/conversation";
import Organisation from "@/lib/models/organisation";
import Property from "@/lib/models/property";
import User from "@/lib/models/user";
import rootStore from "@/lib/stores/root-store";
import { router } from "expo-router";

export const loadUserData = async () => {
    try {
        rootStore.setLoading(true);
        await setAuthHeaders();
        const userData: UserData = await fetchUserData();
        const user = new User(userData.id, userData.first_name, userData.last_name, userData.email);
        const organisation = new Organisation(
            userData.organisation.id,
            userData.organisation.name,
        );
        userData.properties?.forEach((property: UserDataProperty) => {
            const propertyModel = new Property(
                property.id,
                property.name,
                property.description,
                property.organisation_id,
                property.user_id,
            );
            property.conversations?.forEach((conversation: UserDataConversation) => {
                propertyModel.addConversation(new Conversation(
                    conversation.id,
                    conversation.property_id,
                    conversation.user_id,
                    conversation.label,
                ))
            })
            organisation.addProperty(propertyModel);
        });
        rootStore.setUser(user);
        rootStore.setOrganisation(organisation);
    } catch (err) {
        router.push('/(auth)/login');
        console.log(err)
    } finally {
        rootStore.setLoading(false);
    }
};