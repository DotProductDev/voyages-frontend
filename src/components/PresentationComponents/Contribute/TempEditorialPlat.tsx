import { useEffect, useMemo, useState } from 'react';

import {
  ChangeSet,
  Contribution,
  EntityUpdate,
  getSchema,
  materializeNew,
  PropertyAccessLevel,
} from '@dotproductdev/voyages-contribute';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { BASEURLNODE } from '@/share/AUTH_BASEURL';

// eslint-disable-next-line import/no-named-as-default
import ContributionForm from './ContributionForm';

const tempContrib: EntityUpdate = {
  type: 'update',
  entityRef: {
    id: '500001',
    schema: 'Voyage',
    type: 'new',
  },
  changes: [
    {
      kind: 'direct',
      property: 'Voyage_voyage_id',
      changed: '500001',
    },
    {
      kind: 'direct',
      property: 'Voyage_dataset',
      changed: '3',
    },
    {
      kind: 'owned',
      property: 'Voyage_Ship',
      ownedEntity: {
        entityRef: {
          id: '94182c3c-1c12-48ff-959d-7d3efcca373c',
          schema: 'VoyageShip',
          type: 'new',
        },
        data: {},
        state: 'new',
      },
      changes: [
        {
          kind: 'direct',
          property: 'VoyageShip_ship_name',
          changed: 'Roode Vos',
        },
        {
          kind: 'linked',
          property: 'VoyageShip_nationality_ship_id',
          changed: {
            entityRef: {
              type: 'existing',
              id: 8,
              schema: 'Nationality',
            },
            data: {
              'Nation name': 'Netherlands',
              Code: 8,
              id: 8,
            },
            state: 'lazy',
          },
        },
        {
          kind: 'linked',
          property: 'VoyageShip_rig_of_vessel_id',
          changed: {
            entityRef: {
              type: 'existing',
              id: 53,
              schema: 'RigOfVessel',
            },
            data: {
              'Rig of vessel': 'Galjoot',
              Code: 38,
              id: 53,
            },
            state: 'lazy',
          },
        },
        {
          kind: 'direct',
          property: 'VoyageShip_tonnage',
          changed: '60',
        },
      ],
    },
    {
      kind: 'owned',
      property: 'Voyage_Outcome',
      ownedEntity: {
        entityRef: {
          id: 'bcbdff00-8cdf-43a0-9869-c4abc6c66086',
          schema: 'VoyageOutcome',
          type: 'new',
        },
        data: {},
        state: 'new',
      },
      changes: [
        {
          kind: 'linked',
          property: 'VoyageOutcome_particular_outcome_id',
          changed: {
            entityRef: {
              type: 'existing',
              id: 142,
              schema: 'ParticularOutcome',
            },
            data: {
              Name: 'Left coast with trading cargo intact',
              Value: 41,
              id: 142,
            },
            state: 'lazy',
          },
        },
      ],
    },
    {
      kind: 'owned',
      property: 'Voyage_Itinerary',
      ownedEntity: {
        entityRef: {
          id: '80179e25-af6e-4860-a2fc-1cb8fe24e1c0',
          schema: 'VoyageItinerary',
          type: 'new',
        },
        data: {},
        state: 'new',
      },
      changes: [
        {
          kind: 'linked',
          property: 'VoyageItinerary_int_first_port_emb_id',
          changed: {
            entityRef: {
              type: 'existing',
              id: 1829,
              schema: 'Location',
            },
            data: {
              Name: 'Madagascar',
              Code: 60811,
              id: 1829,
            },
            state: 'lazy',
          },
        },
        {
          kind: 'linked',
          property: 'VoyageItinerary_port_of_departure_id',
          changed: {
            entityRef: {
              type: 'existing',
              id: 1822,
              schema: 'Location',
            },
            data: {
              Name: 'Cape of Good Hope',
              Code: 60803,
              id: 1822,
            },
            state: 'lazy',
          },
        },
      ],
    },
    {
      kind: 'ownedList',
      property: 'Voyage_Enslavement relations',
      removed: [],
      modified: [
        {
          kind: 'owned',
          ownedEntity: {
            entityRef: {
              id: 'b3d1d073-ad78-46c9-b084-ae5c49a335ae',
              schema: 'EnslavementRelation',
              type: 'new',
            },
            data: {},
            state: 'new',
          },
          changes: [
            {
              kind: 'linked',
              property: 'EnslavementRelation_relation_type_id',
              changed: {
                entityRef: {
                  type: 'existing',
                  id: 1,
                  schema: 'EnslavementRelationType',
                },
                data: {
                  'Relation type': 'Transportation',
                  id: 1,
                },
                state: 'lazy',
              },
            },
            {
              kind: 'ownedList',
              property: 'EnslavementRelation_Enslavers in relation',
              removed: [],
              modified: [
                {
                  kind: 'owned',
                  ownedEntity: {
                    entityRef: {
                      id: '62775ecb-9479-4756-8c4a-7c52910ec1c1',
                      schema: 'EnslaverInRelation',
                      type: 'new',
                    },
                    data: {},
                    state: 'new',
                  },
                  changes: [
                    {
                      kind: 'linked',
                      property: 'EnslaverInRelation_enslaver_alias_id',
                      changed: {
                        entityRef: {
                          id: 'CanonicalEnslaverAliasId_VOC',
                          schema: 'EnslaverAliasWithIdentity',
                          type: 'new',
                        },
                        data: {},
                        state: 'new',
                      },
                      linkedChanges: [
                        {
                          kind: 'direct',
                          property:
                            'EnslaverAlias_alias_EnslaverAliasWithIdentity',
                          changed: 'VOC',
                        },
                        {
                          kind: 'linked',
                          property: 'EnslaverAliasWithIdentity_identity_id',
                          changed: {
                            entityRef: {
                              id: 'CanonicalEnslaverIdentityId_VOC',
                              schema: 'Enslaver',
                              type: 'new',
                            },
                            data: {},
                            state: 'new',
                          },
                          linkedChanges: [
                            {
                              kind: 'direct',
                              property: 'Enslaver_principal_alias',
                              changed: 'VOC',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      kind: 'ownedList',
                      property: 'EnslaverInRelation_Roles',
                      removed: [],
                      modified: [
                        {
                          kind: 'owned',
                          property: 'EnslaverInRelation_Roles',
                          ownedEntity: {
                            entityRef: {
                              id: '2da11626-69fa-43d6-9a2b-614b6989ea2a',
                              schema: 'EnslaverRelationRoleConn',
                              type: 'new',
                            },
                            data: {},
                            state: 'new',
                          },
                          changes: [
                            {
                              kind: 'linked',
                              property:
                                'EnslaverRelationRoleConn_enslaverrole_id',
                              changed: {
                                entityRef: {
                                  type: 'existing',
                                  id: 4,
                                  schema: 'EnslaverRole',
                                },
                                data: {
                                  'Enslaver role': 'Owner',
                                  id: 4,
                                },
                                state: 'lazy',
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const _contribs: ChangeSet[] = [tempContrib].map((u) => ({
  id: 'mock',
  author: 'Mock author',
  title: `Mock Contribution for Voyage #${u.entityRef.id}`,
  changes: [u],
  comments: 'This is a mock contribution for testing purposes.',
  timestamp: new Date().getTime(),
}));

export const TempEditorialPlat = () => {
  const [active, setActive] = useState<ChangeSet | undefined>(undefined);
  const [contribs, setContribs] = useState<ChangeSet[]>(_contribs);
  const empty = useMemo(
    () =>
      active
        ? materializeNew(
            getSchema(active.changes[0].entityRef.schema),
            active.changes?.[0].entityRef.id,
          )
        : undefined,
    [active],
  );
  useEffect(() => {
    // Load contributions from the server.
    const load = async () => {
      try {
        const res = await fetch(
          `${BASEURLNODE}/contributions?page=1&limit=100`,
        );
        const data = (await res.json()).data as Contribution[];
        setContribs(data.map((c) => c.changeSet));
      } catch (error) {
        console.error('Failed to load contributions:', error);
      }
    };
    load();
  }, []);
  return (
    <>
      {active === undefined && (
        <div>
          <h1>Temporary (Mocked) Editorial Platform</h1>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contribs.map((c, i) => (
                  <TableRow key={i} onClick={() => setActive(c)}>
                    <TableCell>{c.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <div className="contribute-content">
        <h1>Contribution from {active?.author}</h1>
        {active !== undefined && empty !== undefined && (
          <ContributionForm
            entity={empty}
            changeSet={active}
            onChange={setActive}
            accessLevel={PropertyAccessLevel.Editor}
          />
        )}
      </div>
    </>
  );
};
