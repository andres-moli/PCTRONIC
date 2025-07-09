export const QUERY_VISIT_STATUS_BY_DATE = (dateInt: string, dateFinish: string) => {
    return `
	SELECT
	MAX(u.name) as trabajador
	,COUNT(*) as "totalVisitas"
	,SUM(
		CASE WHEN v.status = 'programmed' THEN 1 ELSE 0 END
	) as "totalProgramadas"
	,SUM(
		CASE WHEN v.status = 'realized' THEN 1 ELSE 0 END
	) as "totalRealizadas"
	,SUM(
		CASE WHEN v.status = 'canceled' THEN 1 ELSE 0 END
	) as "totalCancelada"
	,SUM(
		CASE WHEN v.status = 'confirmed' THEN 1 ELSE 0 END
	) as "totalConfirmada"
	--,count(distinct c."departmentId") as total_departamentos
FROM
	sec_user AS u
	left JOIN	
	cyt_visit as v
	ON u.id = v."userId"
	and u."deletedAt" IS NULL
WHERE
	v."dateVisit" >= '${dateInt} 00:00:00'
    AND 
    v."dateVisit" <= '${dateFinish} 23:59:59'
	AND
	v."deletedAt" IS NULL
GROUP BY
	v."userId"
`
}  
export const QUERY_VISIT_STATUS_BY_COMENT = (dateInt: string, dateFinish: string) => {
	return `SELECT
	MAX(u.name) as trabajador
	,COUNT(*) as "totalComentarios"
	,SUM(
		CASE WHEN c.status = 'pendinig' THEN 1 ELSE 0 END
	) as "totalPendientes"
	,SUM(
		CASE WHEN c.status = 'canceled' THEN 1 ELSE 0 END
	) as "totalCancelada"
	,SUM(
		CASE WHEN c.status = 'realized' THEN 1 ELSE 0 END
	) as "totalRealizada"
FROM
	sec_user as u
left JOIN	
	"cyt_visitComent" as c
	ON u.id = c."userId"
	and u."deletedAt" IS NULL
WHERE
	c."deletedAt" IS NULL
	and
	c.type = 'commitments'
	and
	c.date >= '${dateInt} 00:00:00'
    AND 
    c.date <= '${dateFinish} 23:59:59'
GROUP BY 
	c."userId"`
}