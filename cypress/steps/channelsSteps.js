import { ADD_CHANNEL_FORM_SELECTORS } from "../elements/channels/add-channel-form-selectors";
import { AVAILABLE_CHANNELS_FORM } from "../elements/channels/available-channels-form";
import { CHANNEL_FORM_SELECTORS } from "../elements/channels/channel-form-selectors";
import { CHANNELS_SELECTORS } from "../elements/channels/channels-selectors";
import { SELECT_CHANNELS_TO_ASSIGN } from "../elements/channels/select-channels-to-assign";
import { HEADER_SELECTORS } from "../elements/header/header-selectors";
import { BUTTON_SELECTORS } from "../elements/shared/button-selectors";
import { SHARED_ELEMENTS } from "../elements/shared/sharedElements";

export function createChannelByView(name, currency, slug = name) {
  cy.get(CHANNELS_SELECTORS.createChannelButton)
    .click()
    .get(ADD_CHANNEL_FORM_SELECTORS.channelName)
    .type(name)
    .get(ADD_CHANNEL_FORM_SELECTORS.slug)
    .type(slug)
    .get(ADD_CHANNEL_FORM_SELECTORS.currency)
    .click();
  cy.get(ADD_CHANNEL_FORM_SELECTORS.currency).type(currency);
  cy.get("body").then($body => {
    if ($body.find(currency).length) {
      cy.contains(ADD_CHANNEL_FORM_SELECTORS.currencyOptions, currency).click();
    } else {
      cy.get(ADD_CHANNEL_FORM_SELECTORS.currencyAutocompleteDropdown).click();
    }
  });
  cy.get(ADD_CHANNEL_FORM_SELECTORS.saveButton).click();
}
export function selectChannelInPicker(channelName) {
  cy.get(CHANNEL_FORM_SELECTORS.channelSelect).click();
  cy.contains(CHANNEL_FORM_SELECTORS.channelOption, channelName)
    .click()
    .get(CHANNEL_FORM_SELECTORS.confirmButton)
    .click();
}
export function selectChannelInHeader(channelName) {
  cy.get(HEADER_SELECTORS.channelSelect).click();
  cy.contains(SHARED_ELEMENTS.selectOption, channelName)
    .scrollIntoView()
    .click();
}
export function selectChannelInDetailsPages(channelName) {
  cy.get(AVAILABLE_CHANNELS_FORM.menageChannelsButton)
    .click()
    .get(SELECT_CHANNELS_TO_ASSIGN.allChannelsCheckbox)
    .click();
  if (channelName) {
    cy.get(SELECT_CHANNELS_TO_ASSIGN.listOfChannels)
      .contains(channelName)
      .click();
  } else {
    cy.get(SELECT_CHANNELS_TO_ASSIGN.channelRow)
      .first()
      .find(SELECT_CHANNELS_TO_ASSIGN.channelCheckbox)
      .click();
  }
  cy.get(SELECT_CHANNELS_TO_ASSIGN.selectChannelsForm)
    .find(BUTTON_SELECTORS.submit)
    .click();
}
export function selectChannelVariantInDetailsPage(channelName, attributeName) {
  cy.get(AVAILABLE_CHANNELS_FORM.menageChannelsButton).click();
  cy.contains(SELECT_CHANNELS_TO_ASSIGN.expandChannelRow, channelName)
    .find(BUTTON_SELECTORS.expandIcon)
    .click();
  cy.contains(SELECT_CHANNELS_TO_ASSIGN.expandChannelRow, channelName)
    .contains(SELECT_CHANNELS_TO_ASSIGN.channelVariantRow, attributeName)
    .find(BUTTON_SELECTORS.checkbox)
    .click();
  cy.get(SELECT_CHANNELS_TO_ASSIGN.selectChannelsForm)
    .find(BUTTON_SELECTORS.submit)
    .click();
}
