context = ...

# start_table_schema
# Within the Dagster pipes subprocess:
schema = [
    {
        "name": "column1",
        "type": "string",
        "description": "The first column",
        "tags": {"source": "source1"},
        "constraints": {"unique": True},
    },
    {
        "name": "column2",
        "type": "int",
        "description": "The second column",
        "tags": {"source": "source2"},
        "constraints": {"min": 0, "max": 100},
    },
]

# Then, when reporting the asset materialization:
context.report_asset_materialization(
    asset_key="foo",
    metadata={
        "table_meta": {
            "type": "table_schema",
            "raw_value": schema,
        }
    },
)
# end_table_schema
