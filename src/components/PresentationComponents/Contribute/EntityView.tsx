import {
  getSchema,
  isMaterializedEntity,
  isMaterializedEntityArray,
  MaterializedEntity,
} from '@dotproductdev/voyages-contribute';

export interface EntityViewProps {
  entity: MaterializedEntity;
  hideEmptyFields: boolean;
}

export const EntityView = ({ entity, ...props }: EntityViewProps) => {
  const schema = getSchema(entity.entityRef.schema);
  const { hideEmptyFields } = props;
  return (
    <div>
      <h4>{schema.getLabel(entity.data, false)}</h4>
      {Object.entries(entity.data)
        .filter(([_, value]) => !hideEmptyFields || value !== null)
        .map(([key, value]) => (
          <div style={{ marginLeft: '6px' }} key={key}>
            <strong>{key}:</strong>
            {isMaterializedEntity(value) ? (
              <EntityView entity={value} {...props} />
            ) : isMaterializedEntityArray(value) ? (
              value.map((v, i) => (
                <div key={i}>
                  <EntityView entity={v} {...props} />
                </div>
              ))
            ) : (
              <span>{value}</span>
            )}
          </div>
        ))}
    </div>
  );
};
