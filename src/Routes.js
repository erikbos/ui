import {
  ArrayInput,
  ArrayField,
  AutocompleteInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  RadioButtonGroupInput,
  SimpleForm,
  SimpleFormIterator,
  SingleFieldList,
  TextField,
  TextInput,
} from 'react-admin';
import { AttributesField } from './misc.js'

export const RouteList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="displayName" />
      <TextField source="path" />
      <TextField source="pathType" />
      <TextField source="routeGroup" />
      <AttributesField source="attributes"/>
      <DateField source="createdAt" showTime />
      <DateField source="createdBy" />
      <DateField source="lastModifiedAt" showTime />
      <TextField source="LastModifiedBy" />
    </Datagrid>
  </List>
);
// <ArrayField source="attributes"><SingleFieldList><TextField source="name" /></SingleFieldList></ArrayField>

export const RouteEdit = props => (
  <Edit mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="displayName" />
      <TextInput source="path" />
      <RadioButtonGroupInput source="pathType" choices={pathTypeChoices} />
      <TextInput source="routeGroup" />
      <ArrayInput source="attributes">
      <SimpleFormIterator>
          <AutocompleteInput source="name" label="name" choices={knownAttributesName}
            onCreate={() => {
              const newAttributePrompt = prompt('Enter a new attribute name');
              const newAttributeName = { id: newAttributePrompt, name: newAttributePrompt };
              knownAttributesName.push(newAttributeName);
              return newAttributeName;
            }}
          />
          <TextInput source="value" label="value"/>
        </SimpleFormIterator>
      </ArrayInput>
      <DateField source="createdAt" showTime />
      <TextField source="createdBy" />
      <DateField source="lastModifiedAt" showTime />
      <TextField source="lastModifiedBy" />
    </SimpleForm>
  </Edit>
);

export const RouteCreate = props => (
  <Create mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="displayName" />
      <TextInput source="path" />
      <RadioButtonGroupInput source="pathType" initialValue="path" choices={pathTypeChoices} />
      <TextInput source="routeGroup" />
      <ArrayInput source="attributes">
        <SimpleFormIterator>
          <AutocompleteInput source="name" label="name" choices={knownAttributesName}
            onCreate={() => {
              const newAttributePrompt = prompt('Enter a new attribute name');
              const newAttributeName = { id: newAttributePrompt, name: newAttributePrompt };
              knownAttributesName.push(newAttributeName);
              return newAttributeName;
            }}
          />
          <TextInput source="value" label="value"/>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

const pathTypeChoices = [
  { id: 'path', name: 'path' },
  { id: 'prefix', name: 'prefix' },
  { id: 'regexp', name: 'regexp' },
];

var knownAttributesName = [
  { id: 'Cluster', name: 'Cluster' },
  { id: 'WeightedClusters', name: 'WeightedClusters' },
  { id: 'ExtAuthz', name: 'ExtAuthz' },
  { id: 'RateLimiting', name: 'RateLimiting' },
  { id: 'DirectResponseStatusCode', name: 'DirectResponseStatusCode' },
  { id: 'DirectResponseBody', name: 'DirectResponseBody' },
  { id: 'RedirectStatusCode', name: 'RedirectStatusCode' },
  { id: 'RedirectScheme', name: 'RedirectScheme' },
  { id: 'RedirectHostName', name: 'RedirectHostName' },
  { id: 'RedirectPort', name: 'RedirectPort' },
  { id: 'RedirectPath', name: 'RedirectPath' },
  { id: 'RedirectStripQuery', name: 'RedirectStripQuery' },
  { id: 'PrefixRewrite', name: 'PrefixRewrite' },
  { id: 'CORSAllowCredentials', name: 'CORSAllowCredentials' },
  { id: 'CORSAllowMethods', name: 'CORSAllowMethods' },
  { id: 'CORSAllowHeaders', name: 'CORSAllowHeaders' },
  { id: 'CORSExposeHeaders', name: 'CORSExposeHeaders' },
  { id: 'CORSMaxAge', name: 'CORSMaxAge' },
  { id: 'HostHeader', name: 'HostHeader' },
  { id: 'RequestHeaderToAdd1', name: 'RequestHeaderToAdd1' },
  { id: 'RequestHeaderToAdd2', name: 'RequestHeaderToAdd2' },
  { id: 'RequestHeaderToAdd3', name: 'RequestHeaderToAdd3' },
  { id: 'RequestHeaderToAdd4', name: 'RequestHeaderToAdd4' },
  { id: 'RequestHeaderToAdd5', name: 'RequestHeaderToAdd5' },
  { id: 'RequestHeadersToRemove', name: 'RequestHeadersToRemove' },
  { id: 'BasicAuth', name: 'BasicAuth' },
  { id: 'RetryOn', name: 'RetryOn' },
  { id: 'PerTryTimeout', name: 'PerTryTimeout' },
  { id: 'NumRetries', name: 'NumRetries' },
  { id: 'RetryOnStatusCodes', name: 'RetryOnStatusCodes' },
  { id: 'RequestMirrorCluster', name: 'RequestMirrorCluster' },
  { id: 'RequestMirrorPercentage', name: 'RequestMirrorPercentage' },
  { id: 'Timeout', name: 'Timeout' },
  { id: 'path', name: 'path' },
  { id: 'prefix', name: 'prefix' },
  { id: 'regexp', name: 'regexp' },
]