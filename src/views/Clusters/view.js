import {
  ArrayField,
  ArrayInput,
  AutocompleteInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  List,
  SimpleForm,
  SimpleFormIterator,
  SingleFieldList,
  TextField,
  TextInput,
} from 'react-admin';
import { AttributesField } from '../misc.js'

export const list = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="displayName" />
      <AttributesField source="attributes"/>
      <DateField source="lastModifiedAt" showTime/>
      <TextField source="LastModifiedBy" />
    </Datagrid>
  </List>
  );
//  <ArrayField source="attributes"><SingleFieldList><ChipField source="name" /></SingleFieldList></ArrayField>

export const edit = props => (
  <Edit mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextField source="name" />
      <TextInput source="displayName" />
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
      <DateField source="createdAt" showTime disabled />
      <TextField source="createdBy"   disabled />
      <DateField source="lastModifiedAt" showTime disabled />
      <TextField source="lastModifiedBy"  disabled />
    </SimpleForm>
  </Edit>
);

export const create = props => (
  <Create mutationMode="pessimistic" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="displayName" />
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

var knownAttributesName = [
  { id: 'Host', name: 'Host' },
  { id: 'Port', name: 'Port' },
  { id: 'ConnectTimeout', name: 'ConnectTimeout' },
  { id: 'IdleTimeout', name: 'IdleTimeout' },
  { id: 'TLS', name: 'TLS' },
  { id: 'SNIHostName', name: 'SNIHostName' },
  { id: 'HealthCheckProtocol', name: 'HealthCheckProtocol' },
  { id: 'HealthCheckHostHeader', name: 'HealthCheckHostHeader' },
  { id: 'HealthCheckPath', name: 'HealthCheckPath' },
  { id: 'HealthCheckInterval', name: 'HealthCheckInterval' },
  { id: 'HealthCheckTimeout', name: 'HealthCheckTimeout' },
  { id: 'HealthCheckUnhealthyThreshold', name: 'HealthCheckUnhealthyThreshold' },
  { id: 'HealthCheckHealthyThreshold', name: 'HealthCheckHealthyThreshold' },
  { id: 'HealthCheckLogFile', name: 'HealthCheckLogFile' },
  { id: 'MaxConnections', name: 'MaxConnections' },
  { id: 'MaxPendingRequests', name: 'MaxPendingRequests' },
  { id: 'MaxRequests', name: 'MaxRequests' },
  { id: 'MaxRetries', name: 'MaxRetries' },
  { id: 'DNSLookupFamily', name: 'DNSLookupFamily' },
  { id: 'DNSRefreshRate', name: 'DNSRefreshRate' },
  { id: 'DNSResolvers', name: 'DNSResolvers' },
];
