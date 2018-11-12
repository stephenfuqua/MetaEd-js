ALTER TABLE [extension].[AccountTypeDescriptor] WITH CHECK ADD CONSTRAINT [FK_AccountTypeDescriptor_Descriptor] FOREIGN KEY ([AccountTypeDescriptorId])
REFERENCES [edfi].[Descriptor] ([DescriptorId])
ON DELETE CASCADE
GO

ALTER TABLE [extension].[BalanceSheetDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_BalanceSheetDimensionReportingTag_BalanceSheetDimension] FOREIGN KEY ([BalanceSheetCode], [MyFiscalYear])
REFERENCES [extension].[BalanceSheetDimension] ([BalanceSheetCode], [MyFiscalYear])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_BalanceSheetDimensionReportingTag_BalanceSheetDimension]
ON [extension].[BalanceSheetDimensionReportingTag] ([BalanceSheetCode] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[BalanceSheetDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_BalanceSheetDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_BalanceSheetDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[BalanceSheetDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_AccountTypeDescriptor] FOREIGN KEY ([AccountTypeDescriptorId])
REFERENCES [extension].[AccountTypeDescriptor] ([AccountTypeDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_AccountTypeDescriptor]
ON [extension].[ChartOfAccount] ([AccountTypeDescriptorId] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_BalanceSheetDimension] FOREIGN KEY ([BalanceSheetCode], [MyFiscalYear])
REFERENCES [extension].[BalanceSheetDimension] ([BalanceSheetCode], [MyFiscalYear])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_BalanceSheetDimension]
ON [extension].[ChartOfAccount] ([BalanceSheetCode] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_EducationOrganization] FOREIGN KEY ([EducationOrganizationId])
REFERENCES [edfi].[EducationOrganization] ([EducationOrganizationId])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_EducationOrganization]
ON [extension].[ChartOfAccount] ([EducationOrganizationId] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_FunctionDimension] FOREIGN KEY ([FunctionCode], [MyFiscalYear])
REFERENCES [extension].[FunctionDimension] ([FunctionCode], [MyFiscalYear])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_FunctionDimension]
ON [extension].[ChartOfAccount] ([FunctionCode] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_FundDimension] FOREIGN KEY ([FundCode], [MyFiscalYear])
REFERENCES [extension].[FundDimension] ([FundCode], [MyFiscalYear])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_FundDimension]
ON [extension].[ChartOfAccount] ([FundCode] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_ObjectDimension] FOREIGN KEY ([MyFiscalYear], [ObjectCode])
REFERENCES [extension].[ObjectDimension] ([MyFiscalYear], [ObjectCode])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_ObjectDimension]
ON [extension].[ChartOfAccount] ([MyFiscalYear] ASC, [ObjectCode] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_OperationalUnitDimension] FOREIGN KEY ([MyFiscalYear], [OperationalUnitCode])
REFERENCES [extension].[OperationalUnitDimension] ([MyFiscalYear], [OperationalUnitCode])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_OperationalUnitDimension]
ON [extension].[ChartOfAccount] ([MyFiscalYear] ASC, [OperationalUnitCode] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_ProgramDimension] FOREIGN KEY ([MyFiscalYear], [ProgramCode])
REFERENCES [extension].[ProgramDimension] ([MyFiscalYear], [ProgramCode])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_ProgramDimension]
ON [extension].[ChartOfAccount] ([MyFiscalYear] ASC, [ProgramCode] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_ProjectDimension] FOREIGN KEY ([MyFiscalYear], [ProjectCode])
REFERENCES [extension].[ProjectDimension] ([MyFiscalYear], [ProjectCode])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_ProjectDimension]
ON [extension].[ChartOfAccount] ([MyFiscalYear] ASC, [ProjectCode] ASC)
GO

ALTER TABLE [extension].[ChartOfAccount] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccount_SourceDimension] FOREIGN KEY ([MyFiscalYear], [SourceCode])
REFERENCES [extension].[SourceDimension] ([MyFiscalYear], [SourceCode])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccount_SourceDimension]
ON [extension].[ChartOfAccount] ([MyFiscalYear] ASC, [SourceCode] ASC)
GO

ALTER TABLE [extension].[ChartOfAccountReportingTag] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccountReportingTag_ChartOfAccount] FOREIGN KEY ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
REFERENCES [extension].[ChartOfAccount] ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccountReportingTag_ChartOfAccount]
ON [extension].[ChartOfAccountReportingTag] ([AccountIdentifier] ASC, [EducationOrganizationId] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[ChartOfAccountReportingTag] WITH CHECK ADD CONSTRAINT [FK_ChartOfAccountReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_ChartOfAccountReportingTag_ReportingTagDescriptor]
ON [extension].[ChartOfAccountReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[FinancialCollectionDescriptor] WITH CHECK ADD CONSTRAINT [FK_FinancialCollectionDescriptor_Descriptor] FOREIGN KEY ([FinancialCollectionDescriptorId])
REFERENCES [edfi].[Descriptor] ([DescriptorId])
ON DELETE CASCADE
GO

ALTER TABLE [extension].[FunctionDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_FunctionDimensionReportingTag_FunctionDimension] FOREIGN KEY ([FunctionCode], [MyFiscalYear])
REFERENCES [extension].[FunctionDimension] ([FunctionCode], [MyFiscalYear])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_FunctionDimensionReportingTag_FunctionDimension]
ON [extension].[FunctionDimensionReportingTag] ([FunctionCode] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[FunctionDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_FunctionDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_FunctionDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[FunctionDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[FundDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_FundDimensionReportingTag_FundDimension] FOREIGN KEY ([FundCode], [MyFiscalYear])
REFERENCES [extension].[FundDimension] ([FundCode], [MyFiscalYear])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_FundDimensionReportingTag_FundDimension]
ON [extension].[FundDimensionReportingTag] ([FundCode] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[FundDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_FundDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_FundDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[FundDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[LocalAccount] WITH CHECK ADD CONSTRAINT [FK_LocalAccount_ChartOfAccount] FOREIGN KEY ([ChartOfAccountIdentifier], [ChartOfAccountEducationOrganizationId], [MyFiscalYear])
REFERENCES [extension].[ChartOfAccount] ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
GO

CREATE NONCLUSTERED INDEX [FK_LocalAccount_ChartOfAccount]
ON [extension].[LocalAccount] ([ChartOfAccountIdentifier] ASC, [ChartOfAccountEducationOrganizationId] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[LocalAccount] WITH CHECK ADD CONSTRAINT [FK_LocalAccount_EducationOrganization] FOREIGN KEY ([EducationOrganizationId])
REFERENCES [edfi].[EducationOrganization] ([EducationOrganizationId])
GO

CREATE NONCLUSTERED INDEX [FK_LocalAccount_EducationOrganization]
ON [extension].[LocalAccount] ([EducationOrganizationId] ASC)
GO

ALTER TABLE [extension].[LocalAccountReportingTag] WITH CHECK ADD CONSTRAINT [FK_LocalAccountReportingTag_LocalAccount] FOREIGN KEY ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
REFERENCES [extension].[LocalAccount] ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_LocalAccountReportingTag_LocalAccount]
ON [extension].[LocalAccountReportingTag] ([AccountIdentifier] ASC, [EducationOrganizationId] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[LocalAccountReportingTag] WITH CHECK ADD CONSTRAINT [FK_LocalAccountReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_LocalAccountReportingTag_ReportingTagDescriptor]
ON [extension].[LocalAccountReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[LocalActual] WITH CHECK ADD CONSTRAINT [FK_LocalActual_FinancialCollectionDescriptor] FOREIGN KEY ([FinancialCollectionDescriptorId])
REFERENCES [extension].[FinancialCollectionDescriptor] ([FinancialCollectionDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_LocalActual_FinancialCollectionDescriptor]
ON [extension].[LocalActual] ([FinancialCollectionDescriptorId] ASC)
GO

ALTER TABLE [extension].[LocalActual] WITH CHECK ADD CONSTRAINT [FK_LocalActual_LocalAccount] FOREIGN KEY ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
REFERENCES [extension].[LocalAccount] ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
GO

CREATE NONCLUSTERED INDEX [FK_LocalActual_LocalAccount]
ON [extension].[LocalActual] ([AccountIdentifier] ASC, [EducationOrganizationId] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[LocalBudget] WITH CHECK ADD CONSTRAINT [FK_LocalBudget_FinancialCollectionDescriptor] FOREIGN KEY ([FinancialCollectionDescriptorId])
REFERENCES [extension].[FinancialCollectionDescriptor] ([FinancialCollectionDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_LocalBudget_FinancialCollectionDescriptor]
ON [extension].[LocalBudget] ([FinancialCollectionDescriptorId] ASC)
GO

ALTER TABLE [extension].[LocalBudget] WITH CHECK ADD CONSTRAINT [FK_LocalBudget_LocalAccount] FOREIGN KEY ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
REFERENCES [extension].[LocalAccount] ([AccountIdentifier], [EducationOrganizationId], [MyFiscalYear])
GO

CREATE NONCLUSTERED INDEX [FK_LocalBudget_LocalAccount]
ON [extension].[LocalBudget] ([AccountIdentifier] ASC, [EducationOrganizationId] ASC, [MyFiscalYear] ASC)
GO

ALTER TABLE [extension].[ObjectDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_ObjectDimensionReportingTag_ObjectDimension] FOREIGN KEY ([MyFiscalYear], [ObjectCode])
REFERENCES [extension].[ObjectDimension] ([MyFiscalYear], [ObjectCode])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_ObjectDimensionReportingTag_ObjectDimension]
ON [extension].[ObjectDimensionReportingTag] ([MyFiscalYear] ASC, [ObjectCode] ASC)
GO

ALTER TABLE [extension].[ObjectDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_ObjectDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_ObjectDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[ObjectDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[OperationalUnitDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_OperationalUnitDimensionReportingTag_OperationalUnitDimension] FOREIGN KEY ([MyFiscalYear], [OperationalUnitCode])
REFERENCES [extension].[OperationalUnitDimension] ([MyFiscalYear], [OperationalUnitCode])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_OperationalUnitDimensionReportingTag_OperationalUnitDimension]
ON [extension].[OperationalUnitDimensionReportingTag] ([MyFiscalYear] ASC, [OperationalUnitCode] ASC)
GO

ALTER TABLE [extension].[OperationalUnitDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_OperationalUnitDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_OperationalUnitDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[OperationalUnitDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[ProgramDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_ProgramDimensionReportingTag_ProgramDimension] FOREIGN KEY ([MyFiscalYear], [ProgramCode])
REFERENCES [extension].[ProgramDimension] ([MyFiscalYear], [ProgramCode])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_ProgramDimensionReportingTag_ProgramDimension]
ON [extension].[ProgramDimensionReportingTag] ([MyFiscalYear] ASC, [ProgramCode] ASC)
GO

ALTER TABLE [extension].[ProgramDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_ProgramDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_ProgramDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[ProgramDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[ProjectDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_ProjectDimensionReportingTag_ProjectDimension] FOREIGN KEY ([MyFiscalYear], [ProjectCode])
REFERENCES [extension].[ProjectDimension] ([MyFiscalYear], [ProjectCode])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_ProjectDimensionReportingTag_ProjectDimension]
ON [extension].[ProjectDimensionReportingTag] ([MyFiscalYear] ASC, [ProjectCode] ASC)
GO

ALTER TABLE [extension].[ProjectDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_ProjectDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_ProjectDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[ProjectDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[ReportingTagDescriptor] WITH CHECK ADD CONSTRAINT [FK_ReportingTagDescriptor_Descriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [edfi].[Descriptor] ([DescriptorId])
ON DELETE CASCADE
GO

ALTER TABLE [extension].[SourceDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_SourceDimensionReportingTag_ReportingTagDescriptor] FOREIGN KEY ([ReportingTagDescriptorId])
REFERENCES [extension].[ReportingTagDescriptor] ([ReportingTagDescriptorId])
GO

CREATE NONCLUSTERED INDEX [FK_SourceDimensionReportingTag_ReportingTagDescriptor]
ON [extension].[SourceDimensionReportingTag] ([ReportingTagDescriptorId] ASC)
GO

ALTER TABLE [extension].[SourceDimensionReportingTag] WITH CHECK ADD CONSTRAINT [FK_SourceDimensionReportingTag_SourceDimension] FOREIGN KEY ([MyFiscalYear], [SourceCode])
REFERENCES [extension].[SourceDimension] ([MyFiscalYear], [SourceCode])
ON DELETE CASCADE
GO

CREATE NONCLUSTERED INDEX [FK_SourceDimensionReportingTag_SourceDimension]
ON [extension].[SourceDimensionReportingTag] ([MyFiscalYear] ASC, [SourceCode] ASC)
GO

