# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### WakeOnLambda <a name="WakeOnLambda" id="wake-on-lambda.WakeOnLambda"></a>

#### Initializers <a name="Initializers" id="wake-on-lambda.WakeOnLambda.Initializer"></a>

```typescript
import { WakeOnLambda } from 'wake-on-lambda'

new WakeOnLambda(scope: Construct, id: string, props: WakeOnLambdaProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wake-on-lambda.WakeOnLambda.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#wake-on-lambda.WakeOnLambda.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#wake-on-lambda.WakeOnLambda.Initializer.parameter.props">props</a></code> | <code><a href="#wake-on-lambda.WakeOnLambdaProps">WakeOnLambdaProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="wake-on-lambda.WakeOnLambda.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="wake-on-lambda.WakeOnLambda.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="wake-on-lambda.WakeOnLambda.Initializer.parameter.props"></a>

- *Type:* <a href="#wake-on-lambda.WakeOnLambdaProps">WakeOnLambdaProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wake-on-lambda.WakeOnLambda.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="wake-on-lambda.WakeOnLambda.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#wake-on-lambda.WakeOnLambda.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="wake-on-lambda.WakeOnLambda.isConstruct"></a>

```typescript
import { WakeOnLambda } from 'wake-on-lambda'

WakeOnLambda.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="wake-on-lambda.WakeOnLambda.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wake-on-lambda.WakeOnLambda.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#wake-on-lambda.WakeOnLambda.property.lambdaFn">lambdaFn</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="wake-on-lambda.WakeOnLambda.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `lambdaFn`<sup>Required</sup> <a name="lambdaFn" id="wake-on-lambda.WakeOnLambda.property.lambdaFn"></a>

```typescript
public readonly lambdaFn: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---


## Structs <a name="Structs" id="Structs"></a>

### WakeOnLambdaProps <a name="WakeOnLambdaProps" id="wake-on-lambda.WakeOnLambdaProps"></a>

#### Initializer <a name="Initializer" id="wake-on-lambda.WakeOnLambdaProps.Initializer"></a>

```typescript
import { WakeOnLambdaProps } from 'wake-on-lambda'

const wakeOnLambdaProps: WakeOnLambdaProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#wake-on-lambda.WakeOnLambdaProps.property.albDnsName">albDnsName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#wake-on-lambda.WakeOnLambdaProps.property.instanceId">instanceId</a></code> | <code>string</code> | *No description.* |

---

##### `albDnsName`<sup>Required</sup> <a name="albDnsName" id="wake-on-lambda.WakeOnLambdaProps.property.albDnsName"></a>

```typescript
public readonly albDnsName: string;
```

- *Type:* string

---

##### `instanceId`<sup>Required</sup> <a name="instanceId" id="wake-on-lambda.WakeOnLambdaProps.property.instanceId"></a>

```typescript
public readonly instanceId: string;
```

- *Type:* string

---



