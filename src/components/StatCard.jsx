
export default function StatCard(props) {
  return (
    <div className="stat-card">
          <h1>{props.maindetail}</h1>
            <>
              <span className="detail-txt">{props.text1}</span>
              <span className="detail-txt">{props.text2}</span>
              <span className="detail-txt">{props.text3}</span>
            </>
        </div>
  )
}
