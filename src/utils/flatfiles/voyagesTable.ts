import { ColumnSelectorTree, TableCellStructureProps } from "@/share/InterfaceTypesTable";

export const column_selector_tree: ColumnSelectorTree[] = [
    {
        "label": {
            "en": "Ship, Nation",
            "es": "Ship, Nation ES",
            "pt": "Ship, Nation PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "voyage_id",
                "label": {
                    "en": "Voyage ID",
                    "es": "Voyage ID ES",
                    "pt": "Voyage ID PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__ship_name",
                "label": {
                    "en": "Vessel name",
                    "es": "Vessel name ES",
                    "pt": "Vessel name PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__year_of_construction",
                "label": {
                    "en": "Year constructed",
                    "es": "Year constructed ES",
                    "pt": "Year constructed PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__vessel_construction_place__name",
                "label": {
                    "en": "Place constructed",
                    "es": "Place constructed ES",
                    "pt": "Place constructed PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__registered_year",
                "label": {
                    "en": "Year registered",
                    "es": "Year registered ES",
                    "pt": "Year registered PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__registered_place__name",
                "label": {
                    "en": "Place registered",
                    "es": "Place registered ES",
                    "pt": "Place registered PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__nationality_ship__name",
                "label": {
                    "en": "Flag of vessel",
                    "es": "Flag of vessel ES",
                    "pt": "Flag of vessel PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__imputed_nationality__name",
                "label": {
                    "en": "Flag of vessel (imp*)",
                    "es": "Flag of vessel (imp*) ES",
                    "pt": "Flag of vessel (imp*) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__rig_of_vessel__name",
                "label": {
                    "en": "Rig or type of vessel",
                    "es": "Rig or type of vessel ES",
                    "pt": "Rig or type of vessel PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__tonnage",
                "label": {
                    "en": "Tonnage",
                    "es": "Tonnage ES",
                    "pt": "Tonnage PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__tonnage_mod",
                "label": {
                    "en": "Standardized tonnage (imp*)",
                    "es": "Standardized tonnage (imp*) ES",
                    "pt": "Standardized tonnage (imp*) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_ship__guns_mounted",
                "label": {
                    "en": "Guns mounted",
                    "es": "Guns mounted ES",
                    "pt": "Guns mounted PT"
                }
            }
        ]
    },
    {
        "label": {
            "en": "Enslavers",
            "es": "Enslavers ES",
            "pt": "Enslavers PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "voyage_enslavers",
                "label": {
                    "en": "Name(s) of Enslaver(s)",
                    "es": "Name(s) of Enslaver(s) ES",
                    "pt": "Name(s) of Enslaver(s) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_crew__crew_voyage_outset",
                "label": {
                    "en": "Crew at voyage outset",
                    "es": "Crew at voyage outset ES",
                    "pt": "Crew at voyage outset PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_crew__crew_first_landing",
                "label": {
                    "en": "Crew at first landing of captives",
                    "es": "Crew at first landing of captives ES",
                    "pt": "Crew at first landing of captives PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_crew__crew_died_complete_voyage",
                "label": {
                    "en": "Crew deaths during complete voyage",
                    "es": "Crew deaths during complete voyage ES",
                    "pt": "Crew deaths during complete voyage PT"
                }
            }
        ]
    },
    {
        "label": {
            "en": "Itinerary",
            "es": "Itinerary ES",
            "pt": "Itinerary PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__imp_port_voyage_begin__name",
                "label": {
                    "en": "Place where vessel's voyage began (*imp)",
                    "es": "Place where vessel's voyage began (*imp) ES",
                    "pt": "Place where vessel's voyage began (*imp) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__imp_principal_place_of_slave_purchase__name",
                "label": {
                    "en": "Principal place where captives were purchased",
                    "es": "Principal place where captives were purchased ES",
                    "pt": "Principal place where captives were purchased PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__first_place_slave_purchase__name",
                "label": {
                    "en": "First place where captives were purchased",
                    "es": "First place where captives were purchased ES",
                    "pt": "First place where captives were purchased PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__second_place_slave_purchase__name",
                "label": {
                    "en": "Second place where captives were purchased",
                    "es": "Second place where captives were purchased ES",
                    "pt": "Second place where captives were purchased PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__third_place_slave_purchase__name",
                "label": {
                    "en": "Third place where captives were purchased",
                    "es": "Third place where captives were purchased ES",
                    "pt": "Third place where captives were purchased PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__port_of_call_before_atl_crossing__name",
                "label": {
                    "en": "Places of call before Atlantic crossing",
                    "es": "Places of call before Atlantic crossing ES",
                    "pt": "Places of call before Atlantic crossing PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__imp_principal_port_slave_dis__name",
                "label": {
                    "en": "Principal place where captives were landed (*imp)",
                    "es": "Principal place where captives were landed (*imp) ES",
                    "pt": "Principal place where captives were landed (*imp) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__first_landing_place__name",
                "label": {
                    "en": "First place where captives were landed",
                    "es": "First place where captives were landed ES",
                    "pt": "First place where captives were landed PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__second_landing_place__name",
                "label": {
                    "en": "Second place where captives were landed",
                    "es": "Second place where captives were landed ES",
                    "pt": "Second place where captives were landed PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__third_landing_place__name",
                "label": {
                    "en": "Third place where captives were landed",
                    "es": "Third place where captives were landed ES",
                    "pt": "Third place where captives were landed PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_itinerary__place_voyage_ended__name",
                "label": {
                    "en": "Place where vessel's voyage ended",
                    "es": "Place where vessel's voyage ended ES",
                    "pt": "Place where vessel's voyage ended PT"
                }
            }
        ]
    },
    {
        "label": {
            "en": "Enslaved people numbers",
            "es": "Enslaved people numbers ES",
            "pt": "Enslaved people numbers PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__imp_total_num_slaves_embarked",
                "label": {
                    "en": "Total embarked (*imp)",
                    "es": "Total embarked (*imp) ES",
                    "pt": "Total embarked (*imp) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__total_num_slaves_purchased",
                "label": {
                    "en": "Total embarked",
                    "es": "Total embarked ES",
                    "pt": "Total embarked PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__imp_total_num_slaves_disembarked",
                "label": {
                    "en": "Total disembarked (*imp)",
                    "es": "Total disembarked (*imp) ES",
                    "pt": "Total disembarked (*imp) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__total_num_slaves_arr_first_port_embark",
                "label": {
                    "en": "Total disembarked",
                    "es": "Total disembarked ES",
                    "pt": "Total disembarked PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__num_slaves_intended_first_port",
                "label": {
                    "en": "Captives intended to be purchased at 1st place",
                    "es": "Captives intended to be purchased at 1st place ES",
                    "pt": "Captives intended to be purchased at 1st place PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__num_slaves_carried_first_port",
                "label": {
                    "en": "Captives carried from 1st port",
                    "es": "Captives carried from 1st port ES",
                    "pt": "Captives carried from 1st port PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__num_slaves_carried_second_port",
                "label": {
                    "en": "Captives carried from 2nd port",
                    "es": "Captives carried from 2nd port ES",
                    "pt": "Captives carried from 2nd port PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__num_slaves_carried_third_port",
                "label": {
                    "en": "Captives carried from 3rd port",
                    "es": "Captives carried from 3rd port ES",
                    "pt": "Captives carried from 3rd port PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__num_slaves_disembark_first_place",
                "label": {
                    "en": "Captives landed at 1st port",
                    "es": "Captives landed at 1st port ES",
                    "pt": "Captives landed at 1st port PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__num_slaves_disembark_second_place",
                "label": {
                    "en": "Captives landed at 2nd port",
                    "es": "Captives landed at 2nd port ES",
                    "pt": "Captives landed at 2nd port PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__num_slaves_disembark_third_place",
                "label": {
                    "en": "Captives landed at 3rd port",
                    "es": "Captives landed at 3rd port ES",
                    "pt": "Captives landed at 3rd port PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__percentage_men_among_embarked_slaves",
                "label": {
                    "en": "Percent men",
                    "es": "Percent men ES",
                    "pt": "Percent men PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__percentage_women_among_embarked_slaves",
                "label": {
                    "en": "Percent women",
                    "es": "Percent women ES",
                    "pt": "Percent women PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__percentage_boys_among_embarked_slaves",
                "label": {
                    "en": "Percent boys",
                    "es": "Percent boys ES",
                    "pt": "Percent boys PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__percentage_girls_among_embarked_slaves",
                "label": {
                    "en": "Percent girls",
                    "es": "Percent girls ES",
                    "pt": "Percent girls PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__male_ratio_among_embarked_slaves",
                "label": {
                    "en": "Percent males",
                    "es": "Percent males ES",
                    "pt": "Percent males PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__child_ratio_among_embarked_slaves",
                "label": {
                    "en": "Percent children",
                    "es": "Percent children ES",
                    "pt": "Percent children PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__imp_jamaican_cash_price",
                "label": {
                    "en": "Sterling cash price in Jamaica (*imp)",
                    "es": "Sterling cash price in Jamaica (*imp) ES",
                    "pt": "Sterling cash price in Jamaica (*imp) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__imp_mortality_during_voyage",
                "label": {
                    "en": "Captive deaths during crossing",
                    "es": "Captive deaths during crossing ES",
                    "pt": "Captive deaths during crossing PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_slaves_numbers__imp_mortality_ratio",
                "label": {
                    "en": "Percentage of captives who died during crossing (*imp)",
                    "es": "Percentage of captives who died during crossing (*imp) ES",
                    "pt": "Percentage of captives who died during crossing (*imp) PT"
                }
            }
        ]
    },
    {
        "label": {
            "en": "Dates",
            "es": "Dates ES",
            "pt": "Dates PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "voyage_dates__imp_arrival_at_port_of_dis_sparsedate__year",
                "label": {
                    "en": "Year arrived with captives",
                    "es": "Year arrived with captives ES",
                    "pt": "Year arrived with captives PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_dates__length_middle_passage_days",
                "label": {
                    "en": "Duration of captives' crossing (in days)",
                    "es": "Duration of captives' crossing (in days) ES",
                    "pt": "Duration of captives' crossing (in days) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_dates__imp_length_home_to_disembark",
                "label": {
                    "en": "Voyage duration, homepart to disembarkation (in days)",
                    "es": "Voyage duration, homepart to disembarkation (in days) ES",
                    "pt": "Voyage duration, homepart to disembarkation (in days) PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_dates__voyage_began",
                "label": {
                    "en": "Date vessel's voyage began",
                    "es": "Date vessel's voyage began ES",
                    "pt": "Date vessel's voyage began PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_dates__slave_purchase_began",
                "label": {
                    "en": "Date captive embarkation began",
                    "es": "Date captive embarkation began ES",
                    "pt": "Date captive embarkation began PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_dates__imp_arrival_at_port_of_dis",
                "label": {
                    "en": "Date vessel arrived with captives",
                    "es": "Date vessel arrived with captives ES",
                    "pt": "Date vessel arrived with captives PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_dates__departure_last_place_of_landing",
                "label": {
                    "en": "Date departed for homeport",
                    "es": "Date departed for homeport ES",
                    "pt": "Date departed for homeport PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_dates__voyage_completed",
                "label": {
                    "en": "Date vessel arrived at homeport",
                    "es": "Date vessel arrived at homeport ES",
                    "pt": "Date vessel arrived at homeport PT"
                }
            }
        ]
    },
    {
        "label": {
            "en": "Outcome",
            "es": "Outcome ES",
            "pt": "Outcome PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "voyage_outcome__particular_outcome__name",
                "label": {
                    "en": "Particular outcome of voyage",
                    "es": "Particular outcome of voyage ES",
                    "pt": "Particular outcome of voyage PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_outcome__outcome_slaves__name",
                "label": {
                    "en": "Outcome of voyage for captives",
                    "es": "Outcome of voyage for captives ES",
                    "pt": "Outcome of voyage for captives PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_outcome__vessel_captured_outcome__name",
                "label": {
                    "en": "Outcome of voyage if ship captured",
                    "es": "Outcome of voyage if ship captured ES",
                    "pt": "Outcome of voyage if ship captured PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_outcome__outcome_owner__name",
                "label": {
                    "en": "Outcome of voyage for owner",
                    "es": "Outcome of voyage for owner ES",
                    "pt": "Outcome of voyage for owner PT"
                }
            },
            {
                "col_width_px": 100,
                "colID": "voyage_outcome__resistance__name",
                "label": {
                    "en": "Resistance",
                    "es": "Resistance ES",
                    "pt": "Resistance PT"
                }
            }
        ]
    },
    {
        "label": {
            "en": "Documentary Sources",
            "es": "Documentary Sources ES",
            "pt": "Documentary Sources PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "voyage_sources",
                "label": {
                    "en": "Source(s)",
                    "es": "Source(s) ES",
                    "pt": "Source(s) PT"
                }
            }
        ]
    },
    {
        "label": {
            "en": "Connections",
            "es": "Connections ES",
            "pt": "Connections PT"
        },
        "children": [
            {
                "col_width_px": 100,
                "colID": "connections",
                "label": {
                    "en": "Connections",
                    "es": "Connections ES",
                    "pt": "Connections PT"
                }
            }
        ]
    }
]

export const tableCell: TableCellStructureProps = {
    "cell_structure": [
        {
            "header_label": {
                "en": "Year arrived with captives",
                "es": "Year arrived with captives ES",
                "pt": "Year arrived with captives PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": null,
            "order_by": [
                "voyage_dates__imp_arrival_at_port_of_dis_sparsedate__year"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__imp_arrival_at_port_of_dis_sparsedate__year",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__imp_arrival_at_port_of_dis_sparsedate__year",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Voyage ID",
                "es": "Voyage ID ES",
                "pt": "Voyage ID PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": "comma",
            "order_by": [
                "voyage_id"
            ],
            "col_width_px": 100,
            "colID": "voyage_id",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_id",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Vessel name",
                "es": "Vessel name ES",
                "pt": "Vessel name PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": null,
            "order_by": [
                "voyage_ship__ship_name"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__ship_name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__ship_name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Place where vessel's voyage began (*imp)",
                "es": "Place where vessel's voyage began (*imp) ES",
                "pt": "Place where vessel's voyage began (*imp) PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__imp_port_voyage_begin__name"
            ],
            "col_width_px": 135,
            "colID": "voyage_itinerary__imp_port_voyage_begin__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__imp_port_voyage_begin__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Principal place where captives were purchased",
                "es": "Principal place where captives were purchased ES",
                "pt": "Principal place where captives were purchased PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__imp_principal_place_of_slave_purchase__name"
            ],
            "col_width_px": 135,
            "colID": "voyage_itinerary__imp_principal_place_of_slave_purchase__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__imp_principal_place_of_slave_purchase__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Principal place where captives were landed (*imp)",
                "es": "Principal place where captives were landed (*imp) ES",
                "pt": "Principal place where captives were landed (*imp) PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__imp_principal_port_slave_dis__name"
            ],
            "col_width_px": 135,
            "colID": "voyage_itinerary__imp_principal_port_slave_dis__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__imp_principal_port_slave_dis__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Connections",
                "es": "Connections ES",
                "pt": "Connections PT"
            },
            "cell_type": "network_modal",
            "visible": true,
            "number_format": null,
            "order_by": [],
            "col_width_px": 100,
            "colID": "connections",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "id",
                        "cell_fn": "networks",
                        "node_class": "voyages"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captives landed at 1st port",
                "es": "Captives landed at 1st port ES",
                "pt": "Captives landed at 1st port PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_slaves_numbers__num_slaves_disembark_first_place"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__num_slaves_disembark_first_place",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__num_slaves_disembark_first_place",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Enslavers",
                "es": "Enslavers ES",
                "pt": "Enslavers PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": null,
            "order_by": [
                "voyage_enslaver_connection__enslaver_alias__alias"
            ],
            "col_width_px": 240,
            "colID": "voyage_enslavers",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_enslavement_relations__relation_enslavers__enslaver_alias__identity__principal_alias",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Crew died during complete voyage",
                "es": "Crew died during complete voyage ES",
                "pt": "Crew died during complete voyage PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_crew__crew_died_complete_voyage"
            ],
            "col_width_px": 100,
            "colID": "voyage_crew__crew_died_complete_voyage",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_crew__crew_died_complete_voyage",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Source",
                "es": "Source ES",
                "pt": "Source PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_source_connections__source__title"
            ],
            "col_width_px": 100,
            "colID": "voyage_sources",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_source_connections__source__title",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Date vessel's voyage began (DATEDEPB,A,C)",
                "es": "Date vessel's voyage began (DATEDEPB,A,C) ES",
                "pt": "Date vessel's voyage began (DATEDEPB,A,C) PT"
            },
            "cell_type": "literal-concat",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_dates__voyage_began_sparsedate__day",
                "voyage_dates__voyage_began_sparsedate__month",
                "voyage_dates__voyage_began_sparsedate__year"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__voyage_began",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__voyage_began_sparsedate__day",
                        "cell_fn": "literal"
                    },
                    {
                        "var_name": "voyage_dates__voyage_began_sparsedate__month",
                        "cell_fn": "literal"
                    },
                    {
                        "var_name": "voyage_dates__voyage_began_sparsedate__year",
                        "cell_fn": "literal"
                    }
                ],
                "join": ","
            }
        },
        {
            "header_label": {
                "en": "Date captive embarkation began (D1SLATRB,A,C)",
                "es": "Date captive embarkation began (D1SLATRB,A,C) ES",
                "pt": "Date captive embarkation began (D1SLATRB,A,C) PT"
            },
            "cell_type": "literal-concat",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_dates__slave_purchase_began_sparsedate__day",
                "voyage_dates__slave_purchase_began_sparsedate__month",
                "voyage_dates__slave_purchase_began_sparsedate__year"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__slave_purchase_began",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__slave_purchase_began_sparsedate__day",
                        "cell_fn": "literal"
                    },
                    {
                        "var_name": "voyage_dates__slave_purchase_began_sparsedate__month",
                        "cell_fn": "literal"
                    },
                    {
                        "var_name": "voyage_dates__slave_purchase_began_sparsedate__year",
                        "cell_fn": "literal"
                    }
                ],
                "join": ","
            }
        },
        {
            "header_label": {
                "en": "Year constructed",
                "es": "Year constructed ES",
                "pt": "Year constructed PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__year_of_construction"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__year_of_construction",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__year_of_construction",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Place constructed",
                "es": "Place constructed ES",
                "pt": "Place constructed PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__vessel_construction_place__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__vessel_construction_place__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__vessel_construction_place__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Year registered",
                "es": "Year registered ES",
                "pt": "Year registered PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__registered_year"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__registered_year",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__registered_year",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Place registered",
                "es": "Place registered ES",
                "pt": "Place registered PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__registered_place__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__registered_place__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__registered_place__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Flag of vessel",
                "es": "Flag of vessel ES",
                "pt": "Flag of vessel PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__nationality_ship__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__nationality_ship__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__nationality_ship__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Flag of vessel (imp*)",
                "es": "Flag of vessel (imp*) ES",
                "pt": "Flag of vessel (imp*) PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__imputed_nationality__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__imputed_nationality__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__imputed_nationality__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Rig or type of vessel",
                "es": "Rig or type of vessel ES",
                "pt": "Rig or type of vessel PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__rig_of_vessel__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__rig_of_vessel__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__rig_of_vessel__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Tonnage",
                "es": "Tonnage ES",
                "pt": "Tonnage PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__tonnage"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__tonnage",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__tonnage",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Standardized tonnage (imp*)",
                "es": "Standardized tonnage (imp*) ES",
                "pt": "Standardized tonnage (imp*) PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_ship__tonnage_mod"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__tonnage_mod",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__tonnage_mod",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Guns mounted",
                "es": "Guns mounted ES",
                "pt": "Guns mounted PT"
            },
            "cell_type": "literal",
            "number_format": null,
            "visible": false,
            "order_by": [
                "voyage_ship__guns_mounted"
            ],
            "col_width_px": 100,
            "colID": "voyage_ship__guns_mounted",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_ship__guns_mounted",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Crew at voyage outset",
                "es": "Crew at voyage outset ES",
                "pt": "Crew at voyage outset PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_crew__crew_voyage_outset"
            ],
            "col_width_px": 100,
            "colID": "voyage_crew__crew_voyage_outset",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_crew__crew_voyage_outset",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Crew at first landing of captives",
                "es": "Crew at first landing of captives ES",
                "pt": "Crew at first landing of captives PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_crew__crew_first_landing"
            ],
            "col_width_px": 100,
            "colID": "voyage_crew__crew_first_landing",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_crew__crew_first_landing",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Crew deaths during complete voyage",
                "es": "Crew deaths during complete voyage ES",
                "pt": "Crew deaths during complete voyage PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_crew__crew_died_complete_voyage"
            ],
            "col_width_px": 100,
            "colID": "voyage_crew__crew_died_complete_voyage",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_crew__crew_died_complete_voyage",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "First place where captives were purchased",
                "es": "First place where captives were purchased ES",
                "pt": "First place where captives were purchased PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__first_place_slave_purchase__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__first_place_slave_purchase__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__first_place_slave_purchase__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Second place where captives were purchased",
                "es": "Second place where captives were purchased ES",
                "pt": "Second place where captives were purchased PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__second_place_slave_purchase__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__second_place_slave_purchase__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__second_place_slave_purchase__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Third place where captives were purchased",
                "es": "Third place where captives were purchased ES",
                "pt": "Third place where captives were purchased PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__third_place_slave_purchase__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__third_place_slave_purchase__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__third_place_slave_purchase__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Places of call before Atlantic crossing",
                "es": "Places of call before Atlantic crossing ES",
                "pt": "Places of call before Atlantic crossing PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__port_of_call_before_atl_crossing__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__port_of_call_before_atl_crossing__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__port_of_call_before_atl_crossing__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "First place where captives were landed",
                "es": "First place where captives were landed ES",
                "pt": "First place where captives were landed PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__first_landing_place__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__first_landing_place__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__first_landing_place__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Second place where captives were landed",
                "es": "Second place where captives were landed ES",
                "pt": "Second place where captives were landed PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__second_landing_place__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__second_landing_place__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__second_landing_place__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Third place where captives were landed",
                "es": "Third place where captives were landed ES",
                "pt": "Third place where captives were landed PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__third_landing_place__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__third_landing_place__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__third_landing_place__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Place where vessel's voyage ended",
                "es": "Place where vessel's voyage ended ES",
                "pt": "Place where vessel's voyage ended PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_itinerary__place_voyage_ended__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_itinerary__place_voyage_ended__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_itinerary__place_voyage_ended__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Total embarked (*imp)",
                "es": "Total embarked (*imp) ES",
                "pt": "Total embarked (*imp) PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": "comma",
            "order_by": [
                "voyage_slaves_numbers__imp_total_num_slaves_embarked"
            ],
            "col_width_px": 110,
            "colID": "voyage_slaves_numbers__imp_total_num_slaves_embarked",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__imp_total_num_slaves_embarked",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Total embarked",
                "es": "Total embarked ES",
                "pt": "Total embarked PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_slaves_numbers__total_num_slaves_purchased"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__total_num_slaves_purchased",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__total_num_slaves_purchased",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Total disembarked (*imp)",
                "es": "Total disembarked (*imp) ES",
                "pt": "Total disembarked (*imp) PT"
            },
            "cell_type": "literal",
            "visible": true,
            "number_format": "comma",
            "order_by": [
                "voyage_slaves_numbers__imp_total_num_slaves_disembarked"
            ],
            "col_width_px": 130,
            "colID": "voyage_slaves_numbers__imp_total_num_slaves_disembarked",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__imp_total_num_slaves_disembarked",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Total disembarked",
                "es": "Total disembarked ES",
                "pt": "Total disembarked PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_slaves_numbers__total_num_slaves_arr_first_port_embark"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__total_num_slaves_arr_first_port_embark",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__total_num_slaves_arr_first_port_embark",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captives intended to be purchased at 1st place",
                "es": "Captives intended to be purchased at 1st place ES",
                "pt": "Captives intended to be purchased at 1st place PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_slaves_numbers__num_slaves_intended_first_port"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__num_slaves_intended_first_port",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__num_slaves_intended_first_port",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captives carried from 1st port",
                "es": "Captives carried from 1st port ES",
                "pt": "Captives carried from 1st port PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_slaves_numbers__num_slaves_carried_first_port"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__num_slaves_carried_first_port",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__num_slaves_carried_first_port",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captives carried from 2nd port",
                "es": "Captives carried from 2nd port ES",
                "pt": "Captives carried from 2nd port PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_slaves_numbers__num_slaves_carried_second_port"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__num_slaves_carried_second_port",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__num_slaves_carried_second_port",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captives carried from 3rd port",
                "es": "Captives carried from 3rd port ES",
                "pt": "Captives carried from 3rd port PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_slaves_numbers__num_slaves_carried_third_port"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__num_slaves_carried_third_port",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__num_slaves_carried_third_port",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captives landed at 2nd port",
                "es": "Captives landed at 2nd port ES",
                "pt": "Captives landed at 2nd port PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_slaves_numbers__num_slaves_disembark_second_place"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__num_slaves_disembark_second_place",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__num_slaves_disembark_second_place",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captives landed at 3rd port",
                "es": "Captives landed at 3rd port ES",
                "pt": "Captives landed at 3rd port PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_slaves_numbers__num_slaves_disembark_third_place"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__num_slaves_disembark_third_place",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__num_slaves_disembark_third_place",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Percent men",
                "es": "Percent men ES",
                "pt": "Percent men PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "percent",
            "order_by": [
                "voyage_slaves_numbers__percentage_men_among_embarked_slaves"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__percentage_men_among_embarked_slaves",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__percentage_men_among_embarked_slaves",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Percent women",
                "es": "Percent women ES",
                "pt": "Percent women PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "percent",
            "order_by": [
                "voyage_slaves_numbers__percentage_women_among_embarked_slaves"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__percentage_women_among_embarked_slaves",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__percentage_women_among_embarked_slaves",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Percent boys",
                "es": "Percent boys ES",
                "pt": "Percent boys PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "percent",
            "order_by": [
                "voyage_slaves_numbers__percentage_boys_among_embarked_slaves"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__percentage_boys_among_embarked_slaves",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__percentage_boys_among_embarked_slaves",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Percent girls",
                "es": "Percent girls ES",
                "pt": "Percent girls PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "percent",
            "order_by": [
                "voyage_slaves_numbers__percentage_girls_among_embarked_slaves"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__percentage_girls_among_embarked_slaves",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__percentage_girls_among_embarked_slaves",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Percent males",
                "es": "Percent males ES",
                "pt": "Percent males PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "percent",
            "order_by": [
                "voyage_slaves_numbers__male_ratio_among_embarked_slaves"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__male_ratio_among_embarked_slaves",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__male_ratio_among_embarked_slaves",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Percent children",
                "es": "Percent children ES",
                "pt": "Percent children PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "percent",
            "order_by": [
                "voyage_slaves_numbers__child_ratio_among_embarked_slaves"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__child_ratio_among_embarked_slaves",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__child_ratio_among_embarked_slaves",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Sterling cash price in Jamaica (*imp)",
                "es": "Sterling cash price in Jamaica (*imp) ES",
                "pt": "Sterling cash price in Jamaica (*imp) PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_slaves_numbers__imp_jamaican_cash_price"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__imp_jamaican_cash_price",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__imp_jamaican_cash_price",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Captive deaths during crossing",
                "es": "Captive deaths during crossing ES",
                "pt": "Captive deaths during crossing PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_slaves_numbers__imp_mortality_during_voyage"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__imp_mortality_during_voyage",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__imp_mortality_during_voyage",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Percentage of captives who died during crossing (*imp)",
                "es": "Percentage of captives who died during crossing (*imp) ES",
                "pt": "Percentage of captives who died during crossing (*imp) PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "percent",
            "order_by": [
                "voyage_slaves_numbers__imp_mortality_ratio"
            ],
            "col_width_px": 100,
            "colID": "voyage_slaves_numbers__imp_mortality_ratio",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_slaves_numbers__imp_mortality_ratio",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Duration of captives' crossing (in days)",
                "es": "Duration of captives' crossing (in days) ES",
                "pt": "Duration of captives' crossing (in days) PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_dates__length_middle_passage_days"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__length_middle_passage_days",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__length_middle_passage_days",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Voyage duration, homepart to disembarkation (in days)",
                "es": "Voyage duration, homepart to disembarkation (in days) ES",
                "pt": "Voyage duration, homepart to disembarkation (in days) PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": "comma",
            "order_by": [
                "voyage_dates__imp_length_home_to_disembark"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__imp_length_home_to_disembark",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__imp_length_home_to_disembark",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Date vessel arrived with captives",
                "es": "Date vessel arrived with captives ES",
                "pt": "Date vessel arrived with captives PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_dates__imp_arrival_at_port_of_dis"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__imp_arrival_at_port_of_dis",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__imp_arrival_at_port_of_dis",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Date departed for homeport",
                "es": "Date departed for homeport ES",
                "pt": "Date departed for homeport PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_dates__departure_last_place_of_landing"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__departure_last_place_of_landing",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__departure_last_place_of_landing",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Date vessel arrived at homeport",
                "es": "Date vessel arrived at homeport ES",
                "pt": "Date vessel arrived at homeport PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_dates__voyage_completed"
            ],
            "col_width_px": 100,
            "colID": "voyage_dates__voyage_completed",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_dates__voyage_completed",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Particular outcome of voyage",
                "es": "Particular outcome of voyage ES",
                "pt": "Particular outcome of voyage PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_outcome__particular_outcome__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_outcome__particular_outcome__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_outcome__particular_outcome__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Outcome of voyage for captives",
                "es": "Outcome of voyage for captives ES",
                "pt": "Outcome of voyage for captives PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_outcome__outcome_slaves__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_outcome__outcome_slaves__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_outcome__outcome_slaves__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Outcome of voyage if ship captured",
                "es": "Outcome of voyage if ship captured ES",
                "pt": "Outcome of voyage if ship captured PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_outcome__vessel_captured_outcome__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_outcome__vessel_captured_outcome__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_outcome__vessel_captured_outcome__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Outcome of voyage for owner",
                "es": "Outcome of voyage for owner ES",
                "pt": "Outcome of voyage for owner PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_outcome__outcome_owner__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_outcome__outcome_owner__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_outcome__outcome_owner__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        },
        {
            "header_label": {
                "en": "Resistance",
                "es": "Resistance ES",
                "pt": "Resistance PT"
            },
            "cell_type": "literal",
            "visible": false,
            "number_format": null,
            "order_by": [
                "voyage_outcome__resistance__name"
            ],
            "col_width_px": 100,
            "colID": "voyage_outcome__resistance__name",
            "cell_val": {
                "fields": [
                    {
                        "var_name": "voyage_outcome__resistance__name",
                        "cell_fn": "literal"
                    }
                ]
            }
        }
    ],
    "column_selector_tree": [
        {
            "label": {
                "en": "Ship, Nation",
                "es": "Ship, Nation ES",
                "pt": "Ship, Nation PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "voyage_id",
                    "label": {
                        "en": "Voyage ID",
                        "es": "Voyage ID ES",
                        "pt": "Voyage ID PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__ship_name",
                    "label": {
                        "en": "Vessel name",
                        "es": "Vessel name ES",
                        "pt": "Vessel name PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__year_of_construction",
                    "label": {
                        "en": "Year constructed",
                        "es": "Year constructed ES",
                        "pt": "Year constructed PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__vessel_construction_place__name",
                    "label": {
                        "en": "Place constructed",
                        "es": "Place constructed ES",
                        "pt": "Place constructed PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__registered_year",
                    "label": {
                        "en": "Year registered",
                        "es": "Year registered ES",
                        "pt": "Year registered PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__registered_place__name",
                    "label": {
                        "en": "Place registered",
                        "es": "Place registered ES",
                        "pt": "Place registered PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__nationality_ship__name",
                    "label": {
                        "en": "Flag of vessel",
                        "es": "Flag of vessel ES",
                        "pt": "Flag of vessel PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__imputed_nationality__name",
                    "label": {
                        "en": "Flag of vessel (imp*)",
                        "es": "Flag of vessel (imp*) ES",
                        "pt": "Flag of vessel (imp*) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__rig_of_vessel__name",
                    "label": {
                        "en": "Rig or type of vessel",
                        "es": "Rig or type of vessel ES",
                        "pt": "Rig or type of vessel PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__tonnage",
                    "label": {
                        "en": "Tonnage",
                        "es": "Tonnage ES",
                        "pt": "Tonnage PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__tonnage_mod",
                    "label": {
                        "en": "Standardized tonnage (imp*)",
                        "es": "Standardized tonnage (imp*) ES",
                        "pt": "Standardized tonnage (imp*) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_ship__guns_mounted",
                    "label": {
                        "en": "Guns mounted",
                        "es": "Guns mounted ES",
                        "pt": "Guns mounted PT"
                    }
                }
            ]
        },
        {
            "label": {
                "en": "Enslavers",
                "es": "Enslavers ES",
                "pt": "Enslavers PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "voyage_enslavers",
                    "label": {
                        "en": "Name(s) of Enslaver(s)",
                        "es": "Name(s) of Enslaver(s) ES",
                        "pt": "Name(s) of Enslaver(s) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_crew__crew_voyage_outset",
                    "label": {
                        "en": "Crew at voyage outset",
                        "es": "Crew at voyage outset ES",
                        "pt": "Crew at voyage outset PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_crew__crew_first_landing",
                    "label": {
                        "en": "Crew at first landing of captives",
                        "es": "Crew at first landing of captives ES",
                        "pt": "Crew at first landing of captives PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_crew__crew_died_complete_voyage",
                    "label": {
                        "en": "Crew deaths during complete voyage",
                        "es": "Crew deaths during complete voyage ES",
                        "pt": "Crew deaths during complete voyage PT"
                    }
                }
            ]
        },
        {
            "label": {
                "en": "Itinerary",
                "es": "Itinerary ES",
                "pt": "Itinerary PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__imp_port_voyage_begin__name",
                    "label": {
                        "en": "Place where vessel's voyage began (*imp)",
                        "es": "Place where vessel's voyage began (*imp) ES",
                        "pt": "Place where vessel's voyage began (*imp) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__imp_principal_place_of_slave_purchase__name",
                    "label": {
                        "en": "Principal place where captives were purchased",
                        "es": "Principal place where captives were purchased ES",
                        "pt": "Principal place where captives were purchased PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__first_place_slave_purchase__name",
                    "label": {
                        "en": "First place where captives were purchased",
                        "es": "First place where captives were purchased ES",
                        "pt": "First place where captives were purchased PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__second_place_slave_purchase__name",
                    "label": {
                        "en": "Second place where captives were purchased",
                        "es": "Second place where captives were purchased ES",
                        "pt": "Second place where captives were purchased PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__third_place_slave_purchase__name",
                    "label": {
                        "en": "Third place where captives were purchased",
                        "es": "Third place where captives were purchased ES",
                        "pt": "Third place where captives were purchased PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__port_of_call_before_atl_crossing__name",
                    "label": {
                        "en": "Places of call before Atlantic crossing",
                        "es": "Places of call before Atlantic crossing ES",
                        "pt": "Places of call before Atlantic crossing PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__imp_principal_port_slave_dis__name",
                    "label": {
                        "en": "Principal place where captives were landed (*imp)",
                        "es": "Principal place where captives were landed (*imp) ES",
                        "pt": "Principal place where captives were landed (*imp) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__first_landing_place__name",
                    "label": {
                        "en": "First place where captives were landed",
                        "es": "First place where captives were landed ES",
                        "pt": "First place where captives were landed PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__second_landing_place__name",
                    "label": {
                        "en": "Second place where captives were landed",
                        "es": "Second place where captives were landed ES",
                        "pt": "Second place where captives were landed PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__third_landing_place__name",
                    "label": {
                        "en": "Third place where captives were landed",
                        "es": "Third place where captives were landed ES",
                        "pt": "Third place where captives were landed PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_itinerary__place_voyage_ended__name",
                    "label": {
                        "en": "Place where vessel's voyage ended",
                        "es": "Place where vessel's voyage ended ES",
                        "pt": "Place where vessel's voyage ended PT"
                    }
                }
            ]
        },
        {
            "label": {
                "en": "Enslaved people numbers",
                "es": "Enslaved people numbers ES",
                "pt": "Enslaved people numbers PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__imp_total_num_slaves_embarked",
                    "label": {
                        "en": "Total embarked (*imp)",
                        "es": "Total embarked (*imp) ES",
                        "pt": "Total embarked (*imp) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__total_num_slaves_purchased",
                    "label": {
                        "en": "Total embarked",
                        "es": "Total embarked ES",
                        "pt": "Total embarked PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__imp_total_num_slaves_disembarked",
                    "label": {
                        "en": "Total disembarked (*imp)",
                        "es": "Total disembarked (*imp) ES",
                        "pt": "Total disembarked (*imp) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__total_num_slaves_arr_first_port_embark",
                    "label": {
                        "en": "Total disembarked",
                        "es": "Total disembarked ES",
                        "pt": "Total disembarked PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__num_slaves_intended_first_port",
                    "label": {
                        "en": "Captives intended to be purchased at 1st place",
                        "es": "Captives intended to be purchased at 1st place ES",
                        "pt": "Captives intended to be purchased at 1st place PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__num_slaves_carried_first_port",
                    "label": {
                        "en": "Captives carried from 1st port",
                        "es": "Captives carried from 1st port ES",
                        "pt": "Captives carried from 1st port PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__num_slaves_carried_second_port",
                    "label": {
                        "en": "Captives carried from 2nd port",
                        "es": "Captives carried from 2nd port ES",
                        "pt": "Captives carried from 2nd port PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__num_slaves_carried_third_port",
                    "label": {
                        "en": "Captives carried from 3rd port",
                        "es": "Captives carried from 3rd port ES",
                        "pt": "Captives carried from 3rd port PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__num_slaves_disembark_first_place",
                    "label": {
                        "en": "Captives landed at 1st port",
                        "es": "Captives landed at 1st port ES",
                        "pt": "Captives landed at 1st port PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__num_slaves_disembark_second_place",
                    "label": {
                        "en": "Captives landed at 2nd port",
                        "es": "Captives landed at 2nd port ES",
                        "pt": "Captives landed at 2nd port PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__num_slaves_disembark_third_place",
                    "label": {
                        "en": "Captives landed at 3rd port",
                        "es": "Captives landed at 3rd port ES",
                        "pt": "Captives landed at 3rd port PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__percentage_men_among_embarked_slaves",
                    "label": {
                        "en": "Percent men",
                        "es": "Percent men ES",
                        "pt": "Percent men PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__percentage_women_among_embarked_slaves",
                    "label": {
                        "en": "Percent women",
                        "es": "Percent women ES",
                        "pt": "Percent women PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__percentage_boys_among_embarked_slaves",
                    "label": {
                        "en": "Percent boys",
                        "es": "Percent boys ES",
                        "pt": "Percent boys PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__percentage_girls_among_embarked_slaves",
                    "label": {
                        "en": "Percent girls",
                        "es": "Percent girls ES",
                        "pt": "Percent girls PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__male_ratio_among_embarked_slaves",
                    "label": {
                        "en": "Percent males",
                        "es": "Percent males ES",
                        "pt": "Percent males PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__child_ratio_among_embarked_slaves",
                    "label": {
                        "en": "Percent children",
                        "es": "Percent children ES",
                        "pt": "Percent children PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__imp_jamaican_cash_price",
                    "label": {
                        "en": "Sterling cash price in Jamaica (*imp)",
                        "es": "Sterling cash price in Jamaica (*imp) ES",
                        "pt": "Sterling cash price in Jamaica (*imp) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__imp_mortality_during_voyage",
                    "label": {
                        "en": "Captive deaths during crossing",
                        "es": "Captive deaths during crossing ES",
                        "pt": "Captive deaths during crossing PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_slaves_numbers__imp_mortality_ratio",
                    "label": {
                        "en": "Percentage of captives who died during crossing (*imp)",
                        "es": "Percentage of captives who died during crossing (*imp) ES",
                        "pt": "Percentage of captives who died during crossing (*imp) PT"
                    }
                }
            ]
        },
        {
            "label": {
                "en": "Dates",
                "es": "Dates ES",
                "pt": "Dates PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__imp_arrival_at_port_of_dis_sparsedate__year",
                    "label": {
                        "en": "Year arrived with captives",
                        "es": "Year arrived with captives ES",
                        "pt": "Year arrived with captives PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__length_middle_passage_days",
                    "label": {
                        "en": "Duration of captives' crossing (in days)",
                        "es": "Duration of captives' crossing (in days) ES",
                        "pt": "Duration of captives' crossing (in days) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__imp_length_home_to_disembark",
                    "label": {
                        "en": "Voyage duration, homepart to disembarkation (in days)",
                        "es": "Voyage duration, homepart to disembarkation (in days) ES",
                        "pt": "Voyage duration, homepart to disembarkation (in days) PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__voyage_began",
                    "label": {
                        "en": "Date vessel's voyage began",
                        "es": "Date vessel's voyage began ES",
                        "pt": "Date vessel's voyage began PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__slave_purchase_began",
                    "label": {
                        "en": "Date captive embarkation began",
                        "es": "Date captive embarkation began ES",
                        "pt": "Date captive embarkation began PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__imp_arrival_at_port_of_dis",
                    "label": {
                        "en": "Date vessel arrived with captives",
                        "es": "Date vessel arrived with captives ES",
                        "pt": "Date vessel arrived with captives PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__departure_last_place_of_landing",
                    "label": {
                        "en": "Date departed for homeport",
                        "es": "Date departed for homeport ES",
                        "pt": "Date departed for homeport PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_dates__voyage_completed",
                    "label": {
                        "en": "Date vessel arrived at homeport",
                        "es": "Date vessel arrived at homeport ES",
                        "pt": "Date vessel arrived at homeport PT"
                    }
                }
            ]
        },
        {
            "label": {
                "en": "Outcome",
                "es": "Outcome ES",
                "pt": "Outcome PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "voyage_outcome__particular_outcome__name",
                    "label": {
                        "en": "Particular outcome of voyage",
                        "es": "Particular outcome of voyage ES",
                        "pt": "Particular outcome of voyage PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_outcome__outcome_slaves__name",
                    "label": {
                        "en": "Outcome of voyage for captives",
                        "es": "Outcome of voyage for captives ES",
                        "pt": "Outcome of voyage for captives PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_outcome__vessel_captured_outcome__name",
                    "label": {
                        "en": "Outcome of voyage if ship captured",
                        "es": "Outcome of voyage if ship captured ES",
                        "pt": "Outcome of voyage if ship captured PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_outcome__outcome_owner__name",
                    "label": {
                        "en": "Outcome of voyage for owner",
                        "es": "Outcome of voyage for owner ES",
                        "pt": "Outcome of voyage for owner PT"
                    }
                },
                {
                    "col_width_px": 100,
                    "colID": "voyage_outcome__resistance__name",
                    "label": {
                        "en": "Resistance",
                        "es": "Resistance ES",
                        "pt": "Resistance PT"
                    }
                }
            ]
        },
        {
            "label": {
                "en": "Documentary Sources",
                "es": "Documentary Sources ES",
                "pt": "Documentary Sources PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "voyage_sources",
                    "label": {
                        "en": "Source(s)",
                        "es": "Source(s) ES",
                        "pt": "Source(s) PT"
                    }
                }
            ]
        },
        {
            "label": {
                "en": "Connections",
                "es": "Connections ES",
                "pt": "Connections PT"
            },
            "children": [
                {
                    "col_width_px": 100,
                    "colID": "connections",
                    "label": {
                        "en": "Connections",
                        "es": "Connections ES",
                        "pt": "Connections PT"
                    }
                }
            ]
        }
    ]
}