// @flow
import type { SharedSimple } from '../model/SharedSimple';
import type { MetaEdEnvironment } from '../MetaEdEnvironment';
import type { Namespace } from '../model/Namespace';
import type { ValidationFailure } from '../validator/ValidationFailure';
import { NoSharedSimple } from '../model/SharedSimple';
import { namespaceNameFrom } from './NamespaceBuilder';
import { extractDocumentation, isErrorText, squareBracketRemoval } from './BuilderUtility';
import type { MetaEdGrammar } from '../grammar/gen/MetaEdGrammar';
import { MetaEdGrammarListener } from '../grammar/gen/MetaEdGrammarListener';
import { sourceMapFrom } from '../model/SourceMap';
import { NoNamespace } from '../model/Namespace';

/**
 * An ANTLR4 listener that creates SharedSimple entities.
 */
export class SharedSimpleBuilder extends MetaEdGrammarListener {
  currentSharedSimple: SharedSimple;
  metaEd: MetaEdEnvironment;
  currentNamespace: Namespace;
  validationFailures: Array<ValidationFailure>;

  constructor(metaEd: MetaEdEnvironment, validationFailures: Array<ValidationFailure>) {
    super();
    this.metaEd = metaEd;
    this.validationFailures = validationFailures;
    this.currentNamespace = NoNamespace;
    this.currentSharedSimple = NoSharedSimple;
  }

  enterNamespaceName(context: MetaEdGrammar.NamespaceNameContext) {
    const namespace: ?Namespace = this.metaEd.namespace.get(namespaceNameFrom(context));
    this.currentNamespace = namespace == null ? NoNamespace : namespace;
  }

  enteringSharedSimple(simpleFactory: () => SharedSimple) {
    this.currentSharedSimple = { ...simpleFactory(), namespace: this.currentNamespace };
  }

  exitingSharedSimple() {
    if (this.currentSharedSimple === NoSharedSimple) return;

    if (this.currentSharedSimple.metaEdName) {
      // $FlowIgnore - allowing currentSharedSimple.type to specify the entityRepository Map property
      const currentSharedSimpleRepository: Map<string, TopLevelEntity> = this.currentNamespace.entity[
        this.currentSharedSimple.type
      ];
      if (currentSharedSimpleRepository.has(this.currentSharedSimple.metaEdName)) {
        this.validationFailures.push({
          validatorName: 'SharedSimpleBuilder',
          category: 'error',
          message: `${this.currentSharedSimple.typeHumanizedName} named ${
            this.currentSharedSimple.metaEdName
          } is a duplicate declaration of that name.`,
          sourceMap: this.currentSharedSimple.sourceMap.type,
          fileMap: null,
        });
        const duplicateEntity: ?SharedSimple = currentSharedSimpleRepository.get(this.currentSharedSimple.metaEdName);
        if (duplicateEntity != null) {
          this.validationFailures.push({
            validatorName: 'SharedSimpleBuilder',
            category: 'error',
            message: `${duplicateEntity.typeHumanizedName} named ${
              duplicateEntity.metaEdName
            } is a duplicate declaration of that name.`,
            sourceMap: duplicateEntity.sourceMap.type,
            fileMap: null,
          });
        }
      } else {
        currentSharedSimpleRepository.set(this.currentSharedSimple.metaEdName, this.currentSharedSimple);
      }
    }
    this.currentSharedSimple = NoSharedSimple;
  }

  enteringName(name: string) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    this.currentSharedSimple.metaEdName = name;
  }

  enterDocumentation(context: MetaEdGrammar.DocumentationContext) {
    if (this.currentSharedSimple === NoSharedSimple) return;
    this.currentSharedSimple.documentation = extractDocumentation(context);
    this.currentSharedSimple.sourceMap.documentation = sourceMapFrom(context);
  }

  enterMetaEdId(context: MetaEdGrammar.MetaEdIdContext) {
    if (
      context.exception ||
      context.METAED_ID() == null ||
      context.METAED_ID().exception != null ||
      isErrorText(context.METAED_ID().getText())
    )
      return;
    if (this.currentSharedSimple !== NoSharedSimple) {
      this.currentSharedSimple.metaEdId = squareBracketRemoval(context.METAED_ID().getText());
      this.currentSharedSimple.sourceMap.metaEdId = sourceMapFrom(context);
    }
  }
}
