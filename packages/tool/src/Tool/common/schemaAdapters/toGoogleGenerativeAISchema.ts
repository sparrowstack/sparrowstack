import type { IToolSchemaParams } from '@tool';
import { PropertyType } from '@tool/common/enums';
import { processParameters, getRequiredParameters } from '@tool/common/utils';

export const toGoogleGenerativeAI = <SchemaType>({
	name,
	parameters,
	description,
}: IToolSchemaParams): SchemaType => {
	const properties = parameters
		? processParameters({
				parameters,
				removeEnums: true,
				upperCasePropertyTypes: true,
			})
		: {};
	const required = parameters ? getRequiredParameters({ parameters }) : [];
	const hasProperties = Object.keys(properties).length > 0;

	// TODO: Only supports one tool for now
	// Google's SDK supports groups of tools to be defined
	// per each `functionDeclarations`object
	const tool = {
		name,
		description,
		...(hasProperties && {
			parameters: {
				type: PropertyType.Object.toUpperCase(),
				properties,
				required,
			},
		}),
	};

	return {
		functionDeclarations: [tool],
	} as SchemaType;
};

/**

GoogleGenerativeAI: Tool Schema

{
    name: "getWeather",
	description: "Get the weather for a given location",
    parameters: {
      type: "OBJECT",
      properties: {
        city: {
          type: "STRING",
          description:
            'The city to get the weather for.',
        },
        stateCode: {
          type: "STRING",
          description:
            'The state code to get the weather for.',
        },
        countryCode: {
          type: "STRING",
          description:
            'The country code to get the weather for.',
        },
      },
      required: ["city", "stateCode", "countryCode"],
    },
  };

{
    name: "getDirectoryStructure",
    parameters: {
      type: "OBJECT",
      description: "Get the weather for a given location",
      properties: {
        city: {
          type: "STRING",
          description:
            'The city to get the weather for.',
        },
        stateCode: {
          type: "STRING",
          description:
            'The state code to get the weather for.',
        },
        countryCode: {
          type: "STRING",
          description:
            'The country code to get the weather for.',
        },
      },
      required: ["city", "stateCode", "countryCode"],
    },
  };
 */
