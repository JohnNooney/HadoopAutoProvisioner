{{/*
Expand the name of the chart.
*/}}
{{- define "HadoopAutoProvisioner.name" -}}
{{- default .Chart.Name .Values.flask.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name for flask.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "HadoopAutoProvisioner.fullname" -}}
{{- if .Values.flask.fullnameOverride }}
{{- .Values.flask.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.flask.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "HadoopAutoProvisioner.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "HadoopAutoProvisioner.labels" -}}
helm.sh/chart: {{ include "HadoopAutoProvisioner.chart" . }}
{{ include "HadoopAutoProvisioner.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels for flask
*/}}
{{- define "HadoopAutoProvisioner.flask.selectorLabels" -}}
app.kubernetes.io/name: {{ include ".Values.flask.container.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "HadoopAutoProvisioner.serviceAccountName" -}}
{{- if .Values.flask.serviceAccount.create }}
{{- default (include "HadoopAutoProvisioner.fullname" .) .Values.flask.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.flask.serviceAccount.name }}
{{- end }}
{{- end }}
